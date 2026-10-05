from django.db import models


class HomepageHero(models.Model):
    lang = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    marked = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    catalog_btn = models.CharField(max_length=100)
    url_catalog = models.CharField(max_length=255)
    history_btn = models.CharField(max_length=100)
    url_history = models.CharField(max_length=255)
    slider_image_label = models.CharField(max_length=255)
    slider_previous_label = models.CharField(max_length=100)
    slider_next_label = models.CharField(max_length=100)
    slider_navigation_label = models.CharField(max_length=100)
    slider_dot_label = models.CharField(max_length=100)
    advantages = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name_plural = "Homepage hero"
        ordering = ["id"]

    def __str__(self):
        return f"Homepage hero ({self.lang})"


class HeroSlide(models.Model):
    hero = models.ForeignKey(HomepageHero, related_name="slider", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.image


class HomeAssortment(models.Model):
    lang = models.CharField(max_length=10)
    eyebrow = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField()
    link_label = models.CharField(max_length=100)
    url_catalog = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Home assortment"
        ordering = ["id"]

    def __str__(self):
        return f"Home assortment ({self.lang})"


class AssortmentCard(models.Model):
    assortment = models.ForeignKey(HomeAssortment, related_name="cards", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    category_slug = models.CharField(max_length=50)
    badge = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.category_slug