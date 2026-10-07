import shutil
import tempfile

from django.contrib import admin
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse

from about.models import Brand

from base.sample import COLLECTIONS, LANGS, SAMPLE_DB, load_sample, read_sample
from homepage.models import Faq

MEDIA_HOST = "http://localhost"


def normalize(value, top=True):
    if isinstance(value, str) and value.startswith(MEDIA_HOST):
        return value[len(MEDIA_HOST):]
    if isinstance(value, dict):
        return {
            k: normalize(v, False)
            for k, v in value.items()
            if v is not None and not (k == "id" and not top)
        }
    if isinstance(value, list):
        return [normalize(v, top) for v in value]
    return value


class ApiContractTests(TestCase):
    """The API must return exactly what frontend/db_orinak_example contains."""

    @classmethod
    def setUpTestData(cls):
        if not SAMPLE_DB.exists():
            cls.sample = None
            return
        cls.sample = read_sample()
        load_sample(cls.sample)

    def setUp(self):
        if self.sample is None:
            self.skipTest(f"{SAMPLE_DB} not found")

    def get(self, url, **extra):
        return self.client.get(url, HTTP_HOST="localhost", **extra)

    def test_every_collection_has_an_endpoint(self):
        self.assertEqual(set(self.sample), set(COLLECTIONS))

    def test_every_endpoint_matches_sample_db(self):
        for name, expected in self.sample.items():
            is_lang_collection = isinstance(expected, list) and expected and "lang" in expected[0]
            for lang in LANGS if is_lang_collection else [None]:
                for slash in ["", "/"]:
                    url = f"/api/{name}{slash}" + (f"?lang={lang}" if lang else "")
                    with self.subTest(url=url):
                        response = self.get(url)
                        self.assertEqual(response.status_code, 200)
                        rows = expected if lang is None else [r for r in expected if r["lang"] == lang]
                        self.assertEqual(normalize(response.json()), normalize(rows))

    def test_logos_returns_single_object(self):
        self.assertIsInstance(self.get("/api/logos").json(), dict)

    def test_unknown_slug_returns_empty_list(self):
        for name in ["products", "categories"]:
            with self.subTest(name=name):
                response = self.get(f"/api/{name}?lang=am&slug=does-not-exist")
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.json(), [])

    def test_filters(self):
        products = self.get("/api/products?lang=am&category_slug=dried-fruits").json()
        self.assertTrue(products)
        self.assertTrue(all(p["category_slug"] == "dried-fruits" for p in products))

        navbar = self.get("/api/navbars?lang=am&url=/about-us").json()
        self.assertEqual(len(navbar), 1)

    def test_variant_ids_are_strings(self):
        product = self.get("/api/products?lang=am").json()[0]
        self.assertTrue(all(isinstance(v["id"], str) for v in product["variants"]))

    def test_api_is_read_only(self):
        for method in ["post", "put", "patch", "delete"]:
            with self.subTest(method=method):
                response = getattr(self.client, method)("/api/faq/1", HTTP_HOST="localhost")
                self.assertIn(response.status_code, (403, 405))
        self.assertEqual(Faq.objects.count(), len(self.sample["faq"]))

    def test_cors_allows_frontend_only(self):
        allowed = self.get("/api/faq?lang=am", HTTP_ORIGIN="http://localhost:3000")
        self.assertEqual(allowed.get("Access-Control-Allow-Origin"), "http://localhost:3000")

        other = self.get("/api/faq?lang=am", HTTP_ORIGIN="https://evil.example")
        self.assertIsNone(other.get("Access-Control-Allow-Origin"))

    def test_images_are_served_from_backend(self):
        logo = self.get("/api/logos").json()
        self.assertEqual(logo["image"], "http://localhost/media/images/header/logo.svg")
        product = self.get("/api/products?lang=am").json()[0]
        self.assertTrue(all(url.startswith("http://localhost/media/images/") for url in product["images"]))

    def test_product_images_keep_their_order(self):
        expected = next(p for p in self.sample["products"] if p["lang"] == "am")
        product = self.get(f"/api/products?lang=am&slug={expected['slug']}").json()[0]
        self.assertEqual(normalize(product["images"]), expected["images"])


PNG = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89"
    b"\x00\x00\x00\rIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00\x05\x18\xd8N\x00\x00\x00\x00IEND\xaeB`\x82"
)


class AdminUploadTests(TestCase):
    """Images are uploaded through /admin/ and come back from the API as backend URLs."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.media_root = tempfile.mkdtemp()
        cls.media_override = override_settings(MEDIA_ROOT=cls.media_root)
        cls.media_override.enable()

    @classmethod
    def tearDownClass(cls):
        cls.media_override.disable()
        shutil.rmtree(cls.media_root, ignore_errors=True)
        super().tearDownClass()

    def setUp(self):
        user = get_user_model().objects.create_superuser("admin", "admin@example.com", "pass")
        self.client.force_login(user)

    def add_brand(self, upload):
        return self.client.post(reverse("admin:about_brand_add"), {
            "lang": "en",
            "code": "test-brand",
            "name": "Test",
            "card_title": "Test card",
            "description": "Test description",
            "image": upload,
            "image_alt": "Test",
        }, HTTP_HOST="localhost")

    def test_admin_upload_is_returned_by_api(self):
        response = self.add_brand(SimpleUploadedFile("new-brand.png", PNG, content_type="image/png"))
        self.assertEqual(response.status_code, 302)
        brand = Brand.objects.get(code="test-brand")
        self.assertTrue(brand.image.name.startswith("images/brands/new-brand"))
        self.assertTrue(brand.image.storage.exists(brand.image.name))

        api = self.client.get("/api/brands?lang=en", HTTP_HOST="localhost").json()
        self.assertEqual(api[0]["image"], "http://localhost/media/" + brand.image.name)

    def test_admin_rejects_non_image_files(self):
        response = self.add_brand(SimpleUploadedFile("evil.html", b"<script>alert(1)</script>", content_type="text/html"))
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Brand.objects.filter(code="test-brand").exists())

    def test_every_admin_page_opens(self):
        for model, model_admin in admin.site._registry.items():
            info = (model._meta.app_label, model._meta.model_name)
            for url in [reverse("admin:%s_%s_changelist" % info), reverse("admin:%s_%s_add" % info)]:
                with self.subTest(url=url):
                    self.assertEqual(self.client.get(url, HTTP_HOST="localhost").status_code, 200)
