from django.db import models

from base.constants import LANG_CHOICES

# Create your models here.
from django.db import models


class GeographyContent(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    breadcrumb_home = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    intro = models.TextField()
    description_1 = models.TextField()
    description_highlight = models.TextField()
    description_2 = models.TextField()
    countries_title = models.CharField(max_length=255)
    bottom_text = models.TextField()
    countries_more = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Geography contents"
        ordering = ["id"]

    def __str__(self):
        return f"Geography ({self.lang})"


class ExportCountry(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Export countries"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "code"], name="unique_country_lang_code"),
        ]

    def __str__(self):
        return f"{self.name} ({self.lang})"