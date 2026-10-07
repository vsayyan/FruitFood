from django.core.validators import FileExtensionValidator
from django.db import models

from base.constants import LANG_CHOICES
from base.fields import IMAGE_EXTENSIONS, validate_image_size


class HomepageHero(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)
    marked = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    catalog_btn = models.CharField(max_length=100)
    url_catalog = models.CharField(max_length=255)
    history_btn = models.CharField(max_length=100)
    url_history = models.CharField(max_length=255)
    slider_image_label = models.CharField(max_length=255)
    slider_previous_label = models.CharField(max_length=100)
    slider_next_label = models.CharField(max_length=100)
    slider_navigation_label = models.CharField(max_length=100)
    slider_dot_label = models.CharField(max_length=100)
    advantages = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name_plural = "Homepage hero"
        ordering = ["id"]

    def __str__(self):
        return f"Homepage hero ({self.lang})"


class HeroSlide(models.Model):
    hero = models.ForeignKey(HomepageHero, related_name="slider", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.FileField(
        upload_to="images/homepage/",
        max_length=255,
        validators=[FileExtensionValidator(IMAGE_EXTENSIONS), validate_image_size],
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image.name


class HomeAssortment(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    eyebrow = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField()
    link_label = models.CharField(max_length=100)
    url_catalog = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Home assortment"
        ordering = ["id"]

    def __str__(self):
        return f"Home assortment ({self.lang})"


class AssortmentCard(models.Model):
    assortment = models.ForeignKey(HomeAssortment, related_name="cards", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    category_slug = models.CharField(max_length=50)
    badge = models.CharField(max_length=100)
    image = models.FileField(
        upload_to="images/homepage/",
        max_length=255,
        validators=[FileExtensionValidator(IMAGE_EXTENSIONS), validate_image_size],
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.category_slug

class Stat(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    value = models.IntegerField()
    suffix = models.CharField(max_length=20, blank=True)
    unit = models.CharField(max_length=20, blank=True)
    label = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Stats"
        ordering = ["id"]

    def __str__(self):
        return f"{self.value}{self.suffix} {self.label} ({self.lang})"


class PhilosophyHeading(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    heading_1 = models.CharField(max_length=255)
    heading_2_before = models.CharField(max_length=255, blank=True)
    heading_2_highlight = models.CharField(max_length=255, blank=True)
    heading_2_after = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = "Philosophy headings"
        ordering = ["id"]

    def __str__(self):
        return f"Philosophy heading ({self.lang})"


class PhilosophyText(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    text = models.TextField()
    btn = models.CharField(max_length=100)
    slider_previous_label = models.CharField(max_length=100)
    slider_next_label = models.CharField(max_length=100)
    slider_image_label = models.CharField(max_length=100)
    slider_navigation_label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Philosophy text"
        ordering = ["id"]

    def __str__(self):
        return f"Philosophy text ({self.lang})"


class PhilosophyImage(models.Model):
    philosophy = models.ForeignKey(PhilosophyText, related_name="images", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.FileField(
        upload_to="images/home/",
        max_length=255,
        validators=[FileExtensionValidator(IMAGE_EXTENSIONS), validate_image_size],
    )
    alt = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image.name


class FaqSmall(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    text = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "FAQ small"
        ordering = ["id"]

    def __str__(self):
        return f"{self.text} ({self.lang})"


class FaqHeading(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    heading = models.CharField(max_length=255)
    text = models.TextField()

    class Meta:
        verbose_name_plural = "FAQ heading"
        ordering = ["id"]

    def __str__(self):
        return f"{self.heading} ({self.lang})"


class Faq(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    question = models.CharField(max_length=500)
    answer = models.TextField()

    class Meta:
        verbose_name_plural = "FAQ"
        ordering = ["id"]

    def __str__(self):
        return f"{self.question} ({self.lang})"
