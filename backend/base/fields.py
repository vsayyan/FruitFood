from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models

IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"]
MAX_IMAGE_SIZE_MB = 5


def validate_image_size(file):
    if getattr(file, "_committed", True):
        return
    if file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024:
        raise ValidationError(f"Image must be {MAX_IMAGE_SIZE_MB} MB or smaller.")


def image_field(upload_to, **kwargs):
    return models.FileField(
        upload_to=upload_to,
        max_length=255,
        validators=[FileExtensionValidator(IMAGE_EXTENSIONS), validate_image_size],
        **kwargs,
    )
