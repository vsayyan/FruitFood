from django.db import models

class FooterLabel(models.Model):
    lang = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField() 
    copyright = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)

class SocialLink(models.Model):
    footer = models.ForeignKey(FooterLabel, related_name='social_links', on_delete=models.CASCADE)
    image = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(max_length=500)
    label = models.CharField(max_length=50)