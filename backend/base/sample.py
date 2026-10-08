import json
from pathlib import Path

from django.conf import settings
from django.core.management.color import no_style
from django.db import connection, models

from header.models import Logo, Languages, Navbar, Headerlabels, Categories, Tags
from footer.models import FooterLabel, SocialLink, PartnerCta
from product.models import Product, ProductImage, ProductVariant, ProductPageLabel, TagIcon
from homepage.models import (
    HomepageHero, HeroSlide, HomeAssortment, AssortmentCard, AssortmentCardImage, Stat,
    PhilosophyHeading, PhilosophyText, PhilosophyImage, FaqSmall, FaqHeading, Faq,
)
from about.models import (
    AboutIntro, IntroSlide, AboutProduction, ProductionDirection, ProductionImage,
    AboutWhyTrustUs, TrustStat, AboutShowcase, ShowcaseImage,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
    Brand, BrandImage, ExportCooperation, OurFactory, FactorySlide, FactoryGalleryImage, WeBelieve,
)
from contact.models import ContactPageContent, ContactInfo, ContactSocialLink
from geography.models import GeographyContent, ExportCountry


SAMPLE_DB = Path(settings.BASE_DIR).parent / "frontend" / "db_orinak_example"
LANGS = ["am", "ru", "en"]


def child(model, fk, rename=None, keep_id=False, children=None):
    return {"model": model, "fk": fk, "rename": rename or {}, "keep_id": keep_id, "children": children or {}}


COLLECTIONS = {
    "logos": {"model": Logo},
    "languages": {"model": Languages},
    "navbars": {"model": Navbar},
    "header_labels": {"model": Headerlabels},
    "categories": {"model": Categories},
    "tags": {"model": Tags},
    "footer_labels": {"model": FooterLabel, "children": {"social_links": child(SocialLink, "footer")}},
    "partner_cta": {"model": PartnerCta},
    "products": {"model": Product, "children": {
        "images": child(ProductImage, "product"),
        "variants": child(ProductVariant, "product", {"id": "code"}, keep_id=True),
    }},
    "product_page_labels": {"model": ProductPageLabel},
    "tag_icons": {"model": TagIcon},
    "homepage_hero": {"model": HomepageHero, "children": {"slider": child(HeroSlide, "hero")}},
    "home_assortment": {"model": HomeAssortment, "children": {
        "cards": child(AssortmentCard, "assortment", children={"images": child(AssortmentCardImage, "card")}),
    }},
    "stats": {"model": Stat},
    "philosophy_headings": {"model": PhilosophyHeading},
    "philosophy_text": {"model": PhilosophyText, "children": {"images": child(PhilosophyImage, "philosophy")}},
    "faq_small": {"model": FaqSmall},
    "faq_heading": {"model": FaqHeading},
    "faq": {"model": Faq},
    "about_intro": {"model": AboutIntro, "children": {"slider": child(IntroSlide, "intro")}},
    "about_production": {"model": AboutProduction, "children": {
        "images": child(ProductionImage, "production"),
        "directions": child(ProductionDirection, "production"),
    }},
    "about_why_trust_us": {"model": AboutWhyTrustUs, "children": {"stats": child(TrustStat, "section", {"isHighlighted": "is_highlighted"})}},
    "about_showcase": {"model": AboutShowcase, "children": {"images": child(ShowcaseImage, "showcase")}},
    "about_quality_naturalness": {"model": AboutQualityNaturalness, "flatten": ["card1", "card2"]},
    "about_philosophy": {"model": AboutPhilosophy},
    "about_philosophy_facts": {"model": AboutPhilosophyFact},
    "about_page_labels": {"model": AboutPageLabel},
    "brands": {"model": Brand, "children": {"images": child(BrandImage, "brand")}},
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


def to_file_names(model, values):
    """FileFields store paths relative to MEDIA_ROOT: "/media/images/x.png" -> "images/x.png"."""
    for field in model._meta.concrete_fields:
        value = values.get(field.name)
        if isinstance(field, models.FileField) and isinstance(value, str) and value.startswith(settings.MEDIA_URL):
            values[field.name] = value[len(settings.MEDIA_URL):]
    return values


def load_sample(data):
    """Fill the database from the db_orinak_example structure. Expects empty tables."""
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
            obj = spec["model"].objects.create(**to_file_names(spec["model"], row))
            create_children(obj, children, nested)


def create_children(parent, children, nested):
    for key, c in children.items():
        for index, item in enumerate(nested[key] or []):
            item = {"image": item} if isinstance(item, str) else dict(item)
            if not c["keep_id"]:
                item.pop("id", None)
            for old, new in c["rename"].items():
                if old in item:
                    item[new] = item.pop(old)
            if "order" in {f.name for f in c["model"]._meta.concrete_fields}:
                item["order"] = index
            grandchildren = {name: item.pop(name, []) for name in c["children"]}
            obj = c["model"].objects.create(**{c["fk"]: parent}, **to_file_names(c["model"], item))
            create_children(obj, c["children"], grandchildren)


def child_models(children):
    for c in children.values():
        yield c["model"]
        yield from child_models(c["children"])


def all_models():
    for spec in COLLECTIONS.values():
        yield spec["model"]
        yield from child_models(spec.get("children", {}))


def clear_sample():
    for spec in COLLECTIONS.values():
        spec["model"].objects.all().delete()


def reset_sequences():
    statements = connection.ops.sequence_reset_sql(no_style(), list(all_models()))
    with connection.cursor() as cursor:
        for statement in statements:
            cursor.execute(statement)


def read_sample(path=SAMPLE_DB):
    return json.loads(Path(path).read_text(encoding="utf-8"))
