from django.contrib import admin

from base.admin import ImagePreviewMixin
from .models import (
    HomepageHero, HeroSlide, HomeAssortment, AssortmentCard, AssortmentCardImage,
    Stat, PhilosophyHeading, PhilosophyText, PhilosophyImage,
    FaqSmall, FaqHeading, Faq,
)


class HeroSlideInline(ImagePreviewMixin, admin.TabularInline):
    model = HeroSlide
    extra = 1


@admin.register(HomepageHero)
class HomepageHeroAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [HeroSlideInline]


class AssortmentCardInline(admin.TabularInline):
    model = AssortmentCard
    extra = 1
    show_change_link = True


class AssortmentCardImageInline(ImagePreviewMixin, admin.TabularInline):
    model = AssortmentCardImage
    extra = 1


@admin.register(AssortmentCard)
class AssortmentCardAdmin(admin.ModelAdmin):
    list_display = ["category_slug", "badge", "assortment"]
    inlines = [AssortmentCardImageInline]


@admin.register(HomeAssortment)
class HomeAssortmentAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [AssortmentCardInline]


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "suffix", "unit", "lang"]
    list_filter = ["lang"]


@admin.register(PhilosophyHeading)
class PhilosophyHeadingAdmin(admin.ModelAdmin):
    list_display = ["heading_1", "lang"]
    list_filter = ["lang"]


class PhilosophyImageInline(ImagePreviewMixin, admin.TabularInline):
    model = PhilosophyImage
    extra = 1


@admin.register(PhilosophyText)
class PhilosophyTextAdmin(admin.ModelAdmin):
    list_display = ["lang", "btn"]
    list_filter = ["lang"]
    inlines = [PhilosophyImageInline]


@admin.register(FaqSmall)
class FaqSmallAdmin(admin.ModelAdmin):
    list_display = ["text", "lang"]
    list_filter = ["lang"]


@admin.register(FaqHeading)
class FaqHeadingAdmin(admin.ModelAdmin):
    list_display = ["heading", "lang"]
    list_filter = ["lang"]


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ["question", "lang"]
    list_filter = ["lang"]
    search_fields = ["question", "answer"]
