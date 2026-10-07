from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import (
    HomepageHero, HeroSlide, HomeAssortment, AssortmentCard,
    Stat, PhilosophyHeading, PhilosophyText, PhilosophyImage,
    FaqSmall, FaqHeading, Faq,
)


class HeroSlideSerializer(ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ["id", "image"]


class HomepageHeroSerializer(ModelSerializer):
    slider = HeroSlideSerializer(many=True, read_only=True)

    class Meta:
        model = HomepageHero
        fields = "__all__"


class AssortmentCardSerializer(ModelSerializer):
    class Meta:
        model = AssortmentCard
        fields = ["id", "category_slug", "badge", "image"]


class HomeAssortmentSerializer(ModelSerializer):
    cards = AssortmentCardSerializer(many=True, read_only=True)

    class Meta:
        model = HomeAssortment
        fields = "__all__"


class StatSerializer(ModelSerializer):
    class Meta:
        model = Stat
        fields = "__all__"


class PhilosophyHeadingSerializer(ModelSerializer):
    class Meta:
        model = PhilosophyHeading
        fields = "__all__"


class PhilosophyImageSerializer(ModelSerializer):
    class Meta:
        model = PhilosophyImage
        fields = ["id", "image", "alt"]


class PhilosophyTextSerializer(ModelSerializer):
    images = PhilosophyImageSerializer(many=True, read_only=True)

    class Meta:
        model = PhilosophyText
        fields = "__all__"


class FaqSmallSerializer(ModelSerializer):
    class Meta:
        model = FaqSmall
        fields = "__all__"


class FaqHeadingSerializer(ModelSerializer):
    class Meta:
        model = FaqHeading
        fields = "__all__"


class FaqSerializer(ModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"
