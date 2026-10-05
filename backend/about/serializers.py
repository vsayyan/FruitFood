from rest_framework import serializers
from .models import (
    AboutProduction, ProductionDirection,
    AboutWhyTrustUs, TrustStat,
    AboutShowcase, ShowcaseImage,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel, IntroSlide, AboutIntro
)

class IntroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntroSlide
        fields = ["id", "image"]


class AboutIntroSerializer(serializers.ModelSerializer):
    slider = IntroSlideSerializer(many=True, read_only=True)

    class Meta:
        model = AboutIntro
        fields = "__all__"
class ProductionDirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionDirection
        fields = ["number", "text"]


class AboutProductionSerializer(serializers.ModelSerializer):
    directions = ProductionDirectionSerializer(many=True, read_only=True)

    class Meta:
        model = AboutProduction
        fields = '__all__'


class TrustStatSerializer(serializers.ModelSerializer):
    isHighlighted = serializers.BooleanField(source="is_highlighted")

    class Meta:
        model = TrustStat
        fields ='__all__' 


class AboutWhyTrustUsSerializer(serializers.ModelSerializer):
    stats = TrustStatSerializer(many=True, read_only=True)

    class Meta:
        model = AboutWhyTrustUs
        fields = '__all__'


class ShowcaseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseImage
        fields = '__all__'


class AboutShowcaseSerializer(serializers.ModelSerializer):
    images = ShowcaseImageSerializer(many=True, read_only=True)

    class Meta:
        model = AboutShowcase
        fields = '__all__'
class AboutQualityNaturalnessSerializer(serializers.ModelSerializer):
    card1 = serializers.SerializerMethodField()
    card2 = serializers.SerializerMethodField()

    class Meta:
        model = AboutQualityNaturalness
        fields = '__all__'

    def get_card1(self, obj):
        return {
            "eyebrow": obj.card1_eyebrow,
            "title": obj.card1_title,
            "paragraphs": obj.card1_paragraphs,
        }

    def get_card2(self, obj):
        return {
            "eyebrow": obj.card2_eyebrow,
            "title": obj.card2_title,
            "paragraph": obj.card2_paragraph,
        }


class AboutPhilosophySerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPhilosophy
        fields ='__all__'


class AboutPhilosophyFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPhilosophyFact
        fields ='__all__'


class AboutPageLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageLabel
        fields = '__all__'