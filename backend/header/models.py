from django.db import models

from base.constants import LANG_CHOICES


class Logo(models.Model):
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Logo"

    def __str__(self):
        return self.title


class Languages(models.Model):
    code = models.CharField(max_length=20, unique=True)
    label = models.CharField(max_length=50)
    image = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Languages"
        ordering = ["id"]

    def __str__(self):
        return self.label


class Navbar(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Navbar"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "url"], name="unique_navbar_lang_url"),
        ]

    def __str__(self):
        return f"{self.title} ({self.lang})"


class Headerlabels(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    all_products = models.CharField(max_length=100)
    products_toggle_label = models.CharField(max_length=255)
    menu_label = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Headerlabels"
        ordering = ["id"]

    def __str__(self):
        return f"Header labels ({self.lang})"


class Categories(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    slug = models.CharField(max_length=100, db_index=True)
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    product_count = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "slug"], name="unique_category_lang_slug"),
        ]

    def __str__(self):
        return f"{self.name} ({self.lang})"


class Tags(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    code = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Tags"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "code"], name="unique_tag_lang_code"),
        ]

    def __str__(self):
        return f"{self.label} ({self.lang})"
