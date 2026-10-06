from django.db import models

from base.constants import LANG_CHOICES


class AboutProduction(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    subtitle = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    paragraphs = models.JSONField(default=list, blank=True)
    image = models.CharField(max_length=255)
    image_alt = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = "About production"
        ordering = ["id"]

    def __str__(self):
        return f"About production ({self.lang})"


class ProductionDirection(models.Model):
    production = models.ForeignKey(AboutProduction, related_name="directions", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    number = models.CharField(max_length=10)
    text = models.TextField(default="")

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.number


class AboutWhyTrustUs(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "About why trust us"
        ordering = ["id"]

    def __str__(self):
        return f"Why trust us ({self.lang})"


class TrustStat(models.Model):
    section = models.ForeignKey(AboutWhyTrustUs, related_name="stats", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    value = models.CharField(max_length=100, blank=True) 
    label = models.TextField()
    is_highlighted = models.BooleanField(default=False)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.value or self.label[:30]


class AboutShowcase(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    prev_label = models.CharField(max_length=100)
    next_label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "About showcase"
        ordering = ["id"]

    def __str__(self):
        return f"Showcase ({self.lang})"


class ShowcaseImage(models.Model):
    showcase = models.ForeignKey(AboutShowcase, related_name="images", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)
    alt = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image


class AboutQualityNaturalness(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    card1_eyebrow = models.CharField(max_length=100)
    card1_title = models.CharField(max_length=255)
    card1_paragraphs = models.JSONField(default=list, blank=True)
    card2_eyebrow = models.CharField(max_length=100)
    card2_title = models.CharField(max_length=255)
    card2_paragraph = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "About quality naturalness"
        ordering = ["id"]

    def __str__(self):
        return f"Quality & naturalness ({self.lang})"


class AboutPhilosophy(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    label = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    title_light = models.CharField(max_length=255)
    text = models.TextField()

    class Meta:
        verbose_name_plural = "About philosophy"
        ordering = ["id"]

    def __str__(self):
        return f"Philosophy ({self.lang})"


class AboutPhilosophyFact(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    value = models.CharField(max_length=50)
    suffix = models.CharField(max_length=20, blank=True)
    label = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "About philosophy facts"
        ordering = ["id"]

    def __str__(self):
        return f"{self.value}{self.suffix} ({self.lang})"


class AboutPageLabel(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    brands_title = models.CharField(max_length=100)
    breadcrumb_label = models.CharField(max_length=100)
    home_label = models.CharField(max_length=100)
    slider_previous_label = models.CharField(max_length=100)
    slider_next_label = models.CharField(max_length=100)
    slider_navigation_label = models.CharField(max_length=100)
    slider_image_label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "About page labels"
        ordering = ["id"]

    def __str__(self):
        return f"About page labels ({self.lang})"

class AboutIntro(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    text_left = models.TextField()
    text_right = models.TextField()
    image_alt = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = "About intro"
        ordering = ["id"]

    def __str__(self):
        return f"About intro ({self.lang})"


class IntroSlide(models.Model):
    intro = models.ForeignKey(AboutIntro, related_name="slider", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image


class Brand(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    card_title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.CharField(max_length=255)
    image_alt = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = "Brands"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "code"], name="unique_brand_lang_code"),
        ]

    def __str__(self):
        return f"{self.name} ({self.lang})"


class ExportCooperation(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)
    left_text = models.TextField()
    right_text = models.TextField()

    class Meta:
        verbose_name_plural = "Export cooperation"
        ordering = ["id"]

    def __str__(self):
        return f"Export cooperation ({self.lang})"


class OurFactory(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    label = models.CharField(max_length=100)
    title_green = models.CharField(max_length=255)
    title_black = models.CharField(max_length=255)
    first_text = models.TextField()
    second_text = models.TextField()
    bottom_left_text = models.TextField()
    bottom_right_text = models.TextField()
    slider_previous_label = models.CharField(max_length=100)
    slider_next_label = models.CharField(max_length=100)
    slider_image_label = models.CharField(max_length=100)
    slider_navigation_label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Our factory"
        ordering = ["id"]

    def __str__(self):
        return f"Our factory ({self.lang})"


class FactorySlide(models.Model):
    factory = models.ForeignKey(OurFactory, related_name="slider", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image


class FactoryGalleryImage(models.Model):
    factory = models.ForeignKey(OurFactory, related_name="gallery", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image


class WeBelieve(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    description = models.TextField()
    title = models.CharField(max_length=255)
    title_end = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "We believe"
        ordering = ["id"]

    def __str__(self):
        return f"We believe ({self.lang})"
