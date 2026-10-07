from django.contrib import admin

from base.admin import ImagePreviewMixin
from .models import (
    AboutProduction, ProductionDirection,
    AboutWhyTrustUs, TrustStat,
    AboutShowcase, ShowcaseImage, AboutIntro, IntroSlide,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
    Brand, ExportCooperation, OurFactory, FactorySlide, FactoryGalleryImage, WeBelieve,
)


class ProductionDirectionInline(admin.TabularInline):
    model = ProductionDirection
    extra = 1


@admin.register(AboutProduction)
class AboutProductionAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [ProductionDirectionInline]


class TrustStatInline(admin.TabularInline):
    model = TrustStat
    extra = 1


@admin.register(AboutWhyTrustUs)
class AboutWhyTrustUsAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [TrustStatInline]


class ShowcaseImageInline(ImagePreviewMixin, admin.TabularInline):
    model = ShowcaseImage
    extra = 1


@admin.register(AboutShowcase)
class AboutShowcaseAdmin(admin.ModelAdmin):
    list_display = ["lang", "prev_label", "next_label"]
    list_filter = ["lang"]
    inlines = [ShowcaseImageInline]


@admin.register(AboutQualityNaturalness)
class AboutQualityNaturalnessAdmin(admin.ModelAdmin):
    list_display = ["lang", "card1_title", "card2_title"]
    list_filter = ["lang"]
    fieldsets = [
        (None, {"fields": ["lang"]}),
        ("Card 1", {"fields": ["card1_eyebrow", "card1_title", "card1_paragraphs"]}),
        ("Card 2", {"fields": ["card2_eyebrow", "card2_title", "card2_paragraph"]}),
    ]


@admin.register(AboutPhilosophy)
class AboutPhilosophyAdmin(admin.ModelAdmin):
    list_display = ["lang", "label", "title"]
    list_filter = ["lang"]


@admin.register(AboutPhilosophyFact)
class AboutPhilosophyFactAdmin(admin.ModelAdmin):
    list_display = ["lang", "value", "suffix", "label"]
    list_filter = ["lang"]


@admin.register(AboutPageLabel)
class AboutPageLabelAdmin(admin.ModelAdmin):
    list_display = ["lang", "brands_title", "home_label"]
    list_filter = ["lang"]


class IntroSlideInline(ImagePreviewMixin, admin.TabularInline):
    model = IntroSlide
    extra = 1


@admin.register(AboutIntro)
class AboutIntroAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [IntroSlideInline]

@admin.register(Brand)
class BrandAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ["name", "code", "lang"]
    list_filter = ["lang"]


@admin.register(ExportCooperation)
class ExportCooperationAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]


class FactorySlideInline(ImagePreviewMixin, admin.TabularInline):
    model = FactorySlide
    extra = 1


class FactoryGalleryImageInline(ImagePreviewMixin, admin.TabularInline):
    model = FactoryGalleryImage
    extra = 1


@admin.register(OurFactory)
class OurFactoryAdmin(admin.ModelAdmin):
    list_display = ["title_green", "lang"]
    list_filter = ["lang"]
    inlines = [FactorySlideInline, FactoryGalleryImageInline]


@admin.register(WeBelieve)
class WeBelieveAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
