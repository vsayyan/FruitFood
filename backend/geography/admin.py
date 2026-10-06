from django.contrib import admin
from .models import GeographyContent, ExportCountry


@admin.register(GeographyContent)
class GeographyContentAdmin(admin.ModelAdmin):
    list_display = ["lang", "title"]
    list_filter = ["lang"]


@admin.register(ExportCountry)
class ExportCountryAdmin(admin.ModelAdmin):
    list_display = ["name", "code", "lang"]
    list_filter = ["lang"]
    search_fields = ["name", "code"]