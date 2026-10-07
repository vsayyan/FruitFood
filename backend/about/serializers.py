from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import (
    AboutIntro, IntroSlide,
    AboutProduction, ProductionDirection,
    AboutWhyTrustUs, TrustStat,
    AboutShowcase, ShowcaseImage,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
    Brand, ExportCooperation, OurFactory, FactorySlide, FactoryGalleryImage, WeBelieve,
)


class IntroSlideSerializer(ModelSerializer):
    class Meta:
        model = IntroSlide
        fields = ["id", "image"]


class AboutIntroSerializer(ModelSerializer):
    slider = IntroSlideSerializer(many=True, read_only=True)

    class Meta:
        model = AboutIntro
        fields = "__all__"


class ProductionDirectionSerializer(ModelSerializer):
    class Meta:
        model = ProductionDirection
        fields = ["number", "text"]


class AboutProductionSerializer(ModelSerializer):
    directions = ProductionDirectionSerializer(many=True, read_only=True)

    class Meta:
        model = AboutProduction
        fields = "__all__"


class TrustStatSerializer(ModelSerializer):
    isHighlighted = serializers.BooleanField(source="is_highlighted")

    class Meta:
        model = TrustStat
        fields = ["value", "label", "isHighlighted"]


class AboutWhyTrustUsSerializer(ModelSerializer):
    stats = TrustStatSerializer(many=True, read_only=True)

    class Meta:
        model = AboutWhyTrustUs
        fields = "__all__"


class ShowcaseImageSerializer(ModelSerializer):
    class Meta:
        model = ShowcaseImage
        fields = ["image", "alt"]


class AboutShowcaseSerializer(ModelSerializer):
    images = ShowcaseImageSerializer(many=True, read_only=True)

    class Meta:
        model = AboutShowcase
        fields = "__all__"


class AboutQualityNaturalnessSerializer(ModelSerializer):
    card1 = serializers.SerializerMethodField()
    card2 = serializers.SerializerMethodField()

    class Meta:
        model = AboutQualityNaturalness
        fields = ["id", "lang", "card1", "card2"]

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


class AboutPhilosophySerializer(ModelSerializer):
    class Meta:
        model = AboutPhilosophy
        fields = "__all__"


class AboutPhilosophyFactSerializer(ModelSerializer):
    class Meta:
        model = AboutPhilosophyFact
        fields = "__all__"


class AboutPageLabelSerializer(ModelSerializer):
    class Meta:
        model = AboutPageLabel
        fields = "__all__"


class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class ExportCooperationSerializer(ModelSerializer):
    class Meta:
        model = ExportCooperation
        fields = "__all__"


class FactorySlideSerializer(ModelSerializer):
    class Meta:
        model = FactorySlide
        fields = ["id", "image"]


class FactoryGalleryImageSerializer(ModelSerializer):
    class Meta:
        model = FactoryGalleryImage
        fields = ["id", "image"]


class OurFactorySerializer(ModelSerializer):
    slider = FactorySlideSerializer(many=True, read_only=True)
    gallery = FactoryGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = OurFactory
        fields = "__all__"


class WeBelieveSerializer(ModelSerializer):
    class Meta:
        model = WeBelieve
        fields = "__all__"
