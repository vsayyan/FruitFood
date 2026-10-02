from django.db import models

# Create your models here.
class Logo(models.Model):
    title = models.CharField(max_length=20)
    image = models.FileField(upload_to='images/header/')
    class Meta:
        verbose_name_plural = "Logo"
class Languages(models.Model):
    code = models.CharField(max_length=20)
    label = models.CharField(max_length=20)
    image = models.FileField(upload_to='images/header/' ,)
    class Meta:
        verbose_name_plural = "Languages"
class Navbar(models.Model):
    lang = models.CharField(max_length=20)
    title = models.CharField(max_length=20)
    url = models.CharField(max_length=20)
    class Meta:
        verbose_name_plural = "Navbar"

class Headerlabels(models.Model):
    lang = models.CharField(max_length=20)
    all_products = models.CharField(max_length=50)
    products_toggle_label = models.CharField(max_length=80)
    menu_label = models.CharField(max_length=10)
    class Meta:
        verbose_name_plural = "Headerlabels"

class Categories(models.Model):
    lang = models.CharField(max_length=10)
    slug = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    image = models.FileField(upload_to='images/categories/dried-fruits.jpg')
    product_count = models.IntegerField()
    class Meta:
        verbose_name_plural = "Categories"
class Tags(models.Model):
    lang = models.CharField(max_length=10)
    code = models.CharField(max_length=20)
    icon = models.CharField(max_length=10)
    label = models.CharField(max_length=20)
    class Meta:
        verbose_name_plural = "Tags"
    