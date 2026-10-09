from django.db import migrations, models

APPS = ["header", "footer", "product", "homepage", "about", "contact", "geography"]
MEDIA_PREFIX = "/media/"


def to_file_name(value):
    if value.startswith(MEDIA_PREFIX):
        return value[len(MEDIA_PREFIX):]
    return value.lstrip("/")


def to_media_path(value):
    return value if value.startswith("/") else MEDIA_PREFIX + value


def convert(apps, func):
    for app_label in APPS:
        for model in apps.get_app_config(app_label).get_models():
            fields = [f.attname for f in model._meta.concrete_fields if isinstance(f, models.FileField)]
            if not fields:
                continue
            for row in model.objects.values("pk", *fields):
                changes = {f: func(row[f]) for f in fields if row[f] and func(row[f]) != row[f]}
                if changes:
                    model.objects.filter(pk=row["pk"]).update(**changes)


def forwards(apps, schema_editor):
    convert(apps, to_file_name)


def backwards(apps, schema_editor):
    convert(apps, to_media_path)


class Migration(migrations.Migration):
    """Image fields are FileFields now: store "images/..." relative to MEDIA_ROOT instead of "/media/images/..."."""

    dependencies = [
        ("base", "0001_media_image_paths"),
        ("about", "0004_image_file_fields"),
        ("contact", "0003_image_file_fields"),
        ("footer", "0004_image_file_fields"),
        ("header", "0004_image_file_fields"),
        ("homepage", "0004_image_file_fields"),
        ("product", "0005_image_file_fields"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
