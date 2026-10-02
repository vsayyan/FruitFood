from django.contrib import admin
from .models import Logo, Languages, Navbar, Headerlabels,Categories,Tags

class LogoAdmin(admin.ModelAdmin):
    list_display = ('title',)

class LanguagesAdmin(admin.ModelAdmin):
    list_display = ('label',)

class NavbarAdmin(admin.ModelAdmin):
    list_display = ('title',)

class HeaderlabelsAdmin(admin.ModelAdmin):
    list_display = ('lang',)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('name',)
class TagsAdmin(admin.ModelAdmin):
    list_display = ('label',)
admin.site.register(Logo, LogoAdmin)
admin.site.register(Languages, LanguagesAdmin)
admin.site.register(Navbar, NavbarAdmin)
admin.site.register(Headerlabels, HeaderlabelsAdmin)
admin.site.register(Categories, CategoriesAdmin)
admin.site.register(Tags, TagsAdmin)
