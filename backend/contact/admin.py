from django.contrib import admin

from base.admin import ImagePreviewMixin
from .models import ContactPageContent, ContactInfo, ContactSocialLink


@admin.register(ContactPageContent)
class ContactPageContentAdmin(admin.ModelAdmin):
    list_display = ["lang", "title", "form_title"]
    list_filter = ["lang"]


class ContactSocialLinkInline(ImagePreviewMixin, admin.TabularInline):
    model = ContactSocialLink
    extra = 1


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ["lang", "email", "address_line_1"]
    list_filter = ["lang"]
    inlines = [ContactSocialLinkInline]