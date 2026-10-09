from django.core.exceptions import ValidationError

IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"]
MAX_IMAGE_SIZE_MB = 5


def validate_image_size(file):
    if getattr(file, "_committed", True):
        return
    if file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024:
        raise ValidationError(f"Image must be {MAX_IMAGE_SIZE_MB} MB or smaller.")

