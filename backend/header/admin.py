from django.contrib import admin

from base.admin import ImagePreviewMixin
from .models import Logo, Languages, Navbar, Headerlabels, Categories, Tags


@admin.register(Logo)
class LogoAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["title"]


@admin.register(Languages)
class LanguagesAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["label", "code"]


@admin.register(Navbar)
class NavbarAdmin(admin.ModelAdmin):
    list_display = ["title", "url", "lang"]
    list_filter = ["lang"]


@admin.register(Headerlabels)
class HeaderlabelsAdmin(admin.ModelAdmin):
    list_display = ["lang", "all_products", "menu_label"]
    list_filter = ["lang"]


@admin.register(Categories)
class CategoriesAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["name", "slug", "lang"]
    list_filter = ["lang"]


@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    list_display = ["label", "code", "lang"]
    list_filter = ["lang"]
