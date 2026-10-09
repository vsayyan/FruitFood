from django.db import migrations, models

APPS = ["header", "footer", "product", "homepage", "about", "contact", "geography"]
OLD_PREFIX = "/images/"
NEW_PREFIX = "/media/images/"


def replace_prefix(value, old, new):
    if isinstance(value, str):
        return new + value[len(old):] if value.startswith(old) else value
    if isinstance(value, list):
        return [replace_prefix(item, old, new) for item in value]
    if isinstance(value, dict):
        return {key: replace_prefix(item, old, new) for key, item in value.items()}
    return value


def move_paths(apps, old, new):
    for app_label in APPS:
        for model in apps.get_app_config(app_label).get_models():
            fields = [
                f for f in model._meta.concrete_fields
                if isinstance(f, (models.CharField, models.TextField, models.JSONField))
            ]
            for obj in model.objects.all():
                changed = []
                for field in fields:
                    value = getattr(obj, field.attname)
                    updated = replace_prefix(value, old, new)
                    if updated != value:
                        setattr(obj, field.attname, updated)
                        changed.append(field.attname)
                if changed:
                    obj.save(update_fields=changed)


def forwards(apps, schema_editor):
    move_paths(apps, OLD_PREFIX, NEW_PREFIX)


def backwards(apps, schema_editor):
    move_paths(apps, NEW_PREFIX, OLD_PREFIX)


class Migration(migrations.Migration):
    """Image paths now point to backend/media/images instead of frontend/public/images."""

    dependencies = [
        ("about", "0003_alter_aboutintro_lang_alter_aboutpagelabel_lang_and_more"),
        ("contact", "0002_alter_contactinfo_lang_alter_contactpagecontent_lang"),
        ("footer", "0003_alter_footerlabel_lang_alter_partnercta_lang"),
        ("geography", "0003_alter_exportcountry_lang_alter_geographycontent_lang_and_more"),
        ("header", "0003_alter_categories_lang_alter_categories_slug_and_more"),
        ("homepage", "0003_alter_faq_lang_alter_faqheading_lang_and_more"),
        ("product", "0004_alter_product_category_slug_alter_product_lang_and_more"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
