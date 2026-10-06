from django.contrib import admin
from .models import FooterLabel, SocialLink, PartnerCta


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1


class FooterLabelAdmin(admin.ModelAdmin):
    list_display = ('title', 'lang')
    inlines = [SocialLinkInline]


class PartnerCtaAdmin(admin.ModelAdmin):
    list_display = ('title', 'lang')


admin.site.register(FooterLabel, FooterLabelAdmin)
admin.site.register(PartnerCta, PartnerCtaAdmin)
