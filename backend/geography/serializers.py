from rest_framework import serializers
from .models import GeographyContent, ExportCountry


class GeographyContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeographyContent
        fields = "__all__"


class ExportCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExportCountry
        fields = "__all__"