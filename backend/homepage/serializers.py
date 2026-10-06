from rest_framework import serializers
from .models import (
    HomepageHero, HeroSlide, HomeAssortment, AssortmentCard,
    Stat, PhilosophyHeading, PhilosophyText, PhilosophyImage,
    FaqSmall, FaqHeading, Faq,
)


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


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = "__all__"


class PhilosophyHeadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhilosophyHeading
        fields = "__all__"


class PhilosophyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhilosophyImage
        fields = ["id", "image", "alt"]


class PhilosophyTextSerializer(serializers.ModelSerializer):
    images = PhilosophyImageSerializer(many=True, read_only=True)

    class Meta:
        model = PhilosophyText
        fields = "__all__"


class FaqSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqSmall
        fields = "__all__"


class FaqHeadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqHeading
        fields = "__all__"


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"
