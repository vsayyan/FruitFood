from django.contrib import admin
from .models import (
    AboutProduction, ProductionDirection,
    AboutWhyTrustUs, TrustStat,
    AboutShowcase, ShowcaseImage, AboutIntro, IntroSlide,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
)


class ProductionDirectionInline(admin.TabularInline):
    model = ProductionDirection
    extra = 1


@admin.register(AboutProduction)
class AboutProductionAdmin(admin.ModelAdmin):
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


class ShowcaseImageInline(admin.TabularInline):
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

class IntroSlideInline(admin.TabularInline):
    model = IntroSlide
    extra = 1


@admin.register(AboutIntro)
class AboutIntroAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [IntroSlideInline]