import json
from pathlib import Path

from django.conf import settings
from django.test import TestCase

from header.models import Logo, Languages, Navbar, Headerlabels, Categories, Tags
from footer.models import FooterLabel, SocialLink, PartnerCta
from product.models import Product, ProductVariant, ProductPageLabel, TagIcon
from homepage.models import (
    HomepageHero, HeroSlide, HomeAssortment, AssortmentCard, Stat,
    PhilosophyHeading, PhilosophyText, PhilosophyImage, FaqSmall, FaqHeading, Faq,
)
from about.models import (
    AboutIntro, IntroSlide, AboutProduction, ProductionDirection,
    AboutWhyTrustUs, TrustStat, AboutShowcase, ShowcaseImage,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
    Brand, ExportCooperation, OurFactory, FactorySlide, FactoryGalleryImage, WeBelieve,
)
from contact.models import ContactPageContent, ContactInfo, ContactSocialLink
from geography.models import GeographyContent, ExportCountry


SAMPLE_DB = Path(settings.BASE_DIR).parent / "frontend" / "db_orinak_example"
LANGS = ["am", "ru", "en"]


def child(model, fk, rename=None, keep_id=False):
    return {"model": model, "fk": fk, "rename": rename or {}, "keep_id": keep_id}


COLLECTIONS = {
    "logos": {"model": Logo},
    "languages": {"model": Languages},
    "navbars": {"model": Navbar},
    "header_labels": {"model": Headerlabels},
    "categories": {"model": Categories},
    "tags": {"model": Tags},
    "footer_labels": {"model": FooterLabel, "children": {"social_links": child(SocialLink, "footer")}},
    "partner_cta": {"model": PartnerCta},
    "products": {"model": Product, "children": {"variants": child(ProductVariant, "product", {"id": "code"}, keep_id=True)}},
    "product_page_labels": {"model": ProductPageLabel},
    "tag_icons": {"model": TagIcon},
    "homepage_hero": {"model": HomepageHero, "children": {"slider": child(HeroSlide, "hero")}},
    "home_assortment": {"model": HomeAssortment, "children": {"cards": child(AssortmentCard, "assortment")}},
    "stats": {"model": Stat},
    "philosophy_headings": {"model": PhilosophyHeading},
    "philosophy_text": {"model": PhilosophyText, "children": {"images": child(PhilosophyImage, "philosophy")}},
    "faq_small": {"model": FaqSmall},
    "faq_heading": {"model": FaqHeading},
    "faq": {"model": Faq},
    "about_intro": {"model": AboutIntro, "children": {"slider": child(IntroSlide, "intro")}},
    "about_production": {"model": AboutProduction, "children": {"directions": child(ProductionDirection, "production")}},
    "about_why_trust_us": {"model": AboutWhyTrustUs, "children": {"stats": child(TrustStat, "section", {"isHighlighted": "is_highlighted"})}},
    "about_showcase": {"model": AboutShowcase, "children": {"images": child(ShowcaseImage, "showcase")}},
    "about_quality_naturalness": {"model": AboutQualityNaturalness, "flatten": ["card1", "card2"]},
    "about_philosophy": {"model": AboutPhilosophy},
    "about_philosophy_facts": {"model": AboutPhilosophyFact},
    "about_page_labels": {"model": AboutPageLabel},
    "brands": {"model": Brand},
    "export_cooperation": {"model": ExportCooperation},
    "our_factory": {"model": OurFactory, "children": {
        "slider": child(FactorySlide, "factory"),
        "gallery": child(FactoryGalleryImage, "factory"),
    }},
    "we_believe": {"model": WeBelieve},
    "contact_page_contents": {"model": ContactPageContent},
    "contact_info": {"model": ContactInfo, "children": {"social_links": child(ContactSocialLink, "contact")}},
    "geography_contents": {"model": GeographyContent},
    "export_countries": {"model": ExportCountry},
}


def load_sample_into_test_db(data):
    for name, spec in COLLECTIONS.items():
        rows = data[name]
        if isinstance(rows, dict):
            rows = [rows]
        children = spec.get("children", {})
        for row in rows:
            row = dict(row)
            for key in spec.get("flatten", []):
                for sub_key, value in (row.pop(key, None) or {}).items():
                    row[f"{key}_{sub_key}"] = value
            nested = {key: row.pop(key, []) for key in children}
            obj = spec["model"].objects.create(**row)
            for key, c in children.items():
                for index, item in enumerate(nested[key] or []):
                    item = dict(item)
                    if not c["keep_id"]:
                        item.pop("id", None)
                    for old, new in c["rename"].items():
                        if old in item:
                            item[new] = item.pop(old)
                    if "order" in {f.name for f in c["model"]._meta.concrete_fields}:
                        item["order"] = index
                    c["model"].objects.create(**{c["fk"]: obj}, **item)


def normalize(value, top=True):
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
        cls.sample = json.loads(SAMPLE_DB.read_text(encoding="utf-8"))
        load_sample_into_test_db(cls.sample)

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
