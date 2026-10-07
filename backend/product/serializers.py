from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import Product, ProductVariant, ProductPageLabel, TagIcon


class ProductVariantSerializer(ModelSerializer):
    id = serializers.CharField(source="code")

    class Meta:
        model = ProductVariant
        fields = ["id", "flavor", "image", "box_image"]


class ProductSerializer(ModelSerializer):
    images = serializers.SerializerMethodField()
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_images(self, obj):
        return [item.image.url for item in obj.gallery.all() if item.image]


class ProductPageLabelSerializer(ModelSerializer):
    class Meta:
        model = ProductPageLabel
        fields = "__all__"


class TagIconSerializer(ModelSerializer):
    class Meta:
        model = TagIcon
        fields = "__all__"
