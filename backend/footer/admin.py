from django.contrib import admin

from base.admin import ImagePreviewMixin
from .models import FooterLabel, SocialLink, PartnerCta


class SocialLinkInline(ImagePreviewMixin, admin.TabularInline):
    model = SocialLink
    extra = 1


@admin.register(FooterLabel)
class FooterLabelAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [SocialLinkInline]


@admin.register(PartnerCta)
class PartnerCtaAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
