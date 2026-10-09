from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import GeographyContent, ExportCountry


class GeographyContentSerializer(ModelSerializer):
    class Meta:
        model = GeographyContent
        fields = "__all__"


class ExportCountrySerializer(ModelSerializer):
    class Meta:
        model = ExportCountry
        fields = "__all__"