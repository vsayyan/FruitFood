from django.db import models

from base.constants import LANG_CHOICES


class Product(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    slug = models.CharField(max_length=100, db_index=True)
    category_slug = models.CharField(max_length=50, db_index=True)
    weight_value = models.IntegerField()
    weight_unit = models.CharField(max_length=10)
    images = models.JSONField(default=list, blank=True)
    tags = models.JSONField(default=list, blank=True)
    name = models.CharField(max_length=200)
    composition = models.TextField(blank=True)
    description = models.TextField(blank=True)
    default_variant = models.CharField(max_length=10, blank=True)
    tastes_count = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Products"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["lang", "slug"], name="unique_product_lang_slug"),
        ]

    def __str__(self):
        return f"{self.name} ({self.lang})"


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    flavor = models.CharField(max_length=200)
    image = models.CharField(max_length=255)
    box_image = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Product variants"
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields=["product", "code"], name="unique_variant_product_code"),
        ]

    def __str__(self):
        return f"{self.code} - {self.flavor}"


class ProductPageLabel(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    home_label = models.CharField(max_length=100)
    catalog_label = models.CharField(max_length=100)
    composition_eyebrow = models.CharField(max_length=100)
    close_button = models.CharField(max_length=100)
    previous_image = models.CharField(max_length=100)
    next_image = models.CharField(max_length=100)
    image_label = models.CharField(max_length=100)
    variants_label = models.CharField(max_length=100)
    composition_button = models.CharField(max_length=100)
    weight_unit = models.CharField(max_length=20)
    taste_unit = models.CharField(max_length=20)
    breadcrumb_label = models.CharField(max_length=100)
    all_products_label = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Product page labels"
        ordering = ["id"]

    def __str__(self):
        return f"Product page labels ({self.lang})"

class TagIcon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=20)

    class Meta:
        verbose_name_plural = "Tag icons"
        ordering = ["id"]

    def __str__(self):
        return f"{self.icon} {self.code}"
