from django.db import models

# Create your models here.
class Logo(models.Model):
    title = models.CharField(max_length=20)
    image = models.FileField(upload_to='images/header/')
class Languages(models.Model):
    code = models.CharField(max_length=20)
    label = models.CharField(max_length=20)
    image = models.FileField(upload_to='images/header/' ,)

class Navbar(models.Model):
    lang = models.CharField(max_length=20)
    title = models.CharField(max_length=20)
    url = models.CharField(max_length=20)
class headerlabels(models.Model):
    lang = models.CharField(max_length=20)
    all_products = models.CharField(max_length=50)
    products_toggle_label = models.CharField(max_length=80)
    menu_label = models.CharField(max_length=10)
    

    
    