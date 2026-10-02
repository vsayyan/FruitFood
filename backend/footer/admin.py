from django.contrib import admin
from .models import FooterLabel

class FooterLabelAdmin(admin.ModelAdmin):
    list_display = ('title',)

admin.site.register(FooterLabel, FooterLabelAdmin)
