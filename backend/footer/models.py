from django.db import models

from base.constants import LANG_CHOICES
from base.fields import image_field

class FooterLabel(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)
    image = image_field("images/footer/", blank=True, null=True)
    description = models.TextField() 
    copyright = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    links_label = models.CharField(max_length=255, default="")

class SocialLink(models.Model):
    footer = models.ForeignKey(FooterLabel, related_name='social_links', on_delete=models.CASCADE)
    image = image_field("images/footer/", blank=True, null=True)
    url = models.URLField(max_length=500)
    label = models.CharField(max_length=50)


class PartnerCta(models.Model):
    lang = models.CharField(max_length=10, choices=LANG_CHOICES, db_index=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    button_text = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Partner CTA"
        ordering = ["id"]

    def __str__(self):
        return f"Partner CTA ({self.lang})"
