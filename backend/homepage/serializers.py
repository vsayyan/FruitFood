from rest_framework import serializers
from .models import HomepageHero, HeroSlide, HomeAssortment, AssortmentCard


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ["id", "image"]


class HomepageHeroSerializer(serializers.ModelSerializer):
    slider = HeroSlideSerializer(many=True, read_only=True)

    class Meta:
        model = HomepageHero
        fields = "__all__"


class AssortmentCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssortmentCard
        fields = ["id", "category_slug", "badge", "image"]


class HomeAssortmentSerializer(serializers.ModelSerializer):
    cards = AssortmentCardSerializer(many=True, read_only=True)

    class Meta:
        model = HomeAssortment
        fields = "__all__"