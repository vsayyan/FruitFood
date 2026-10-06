from rest_framework import serializers
from .models import Product, ProductVariant, ProductPageLabel, TagIcon


class ProductVariantSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="code")

    class Meta:
        model = ProductVariant
        fields = ["id", "flavor", "image", "box_image"]


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductPageLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPageLabel
        fields = "__all__"


class TagIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagIcon
        fields = "__all__"
