from rest_framework import serializers
from .models import Product, ProductVariant, ProductPageLabel

class ProductVariantSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="code")

    class Meta:
        model = ProductVariant
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class ProductPageLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPageLabel
        fields = '__all__'