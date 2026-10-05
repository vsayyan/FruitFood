from django.contrib import admin
from .models import HomepageHero, HeroSlide, HomeAssortment, AssortmentCard


class HeroSlideInline(admin.TabularInline):
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


@admin.register(HomeAssortment)
class HomeAssortmentAdmin(admin.ModelAdmin):
    list_display = ["title", "lang"]
    list_filter = ["lang"]
    inlines = [AssortmentCardInline]