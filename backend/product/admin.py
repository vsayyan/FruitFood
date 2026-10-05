from django.contrib import admin
from .models import Product, ProductVariant, ProductPageLabel


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "lang", "slug", "category_slug"]
    list_filter = ["lang", "category_slug"]
    search_fields = ["name", "slug"]
    inlines = [ProductVariantInline]
@admin.register(ProductPageLabel)
class ProductPageLabelAdmin(admin.ModelAdmin):
    list_display = ["lang", "home_label", "catalog_label"]
    list_filter = ["lang"]