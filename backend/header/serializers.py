from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import Logo, Languages, Navbar, Headerlabels, Categories, Tags


class LogoSerializer(ModelSerializer):
    class Meta:
        model = Logo
        fields = "__all__"


class LanguagesSerializer(ModelSerializer):
    class Meta:
        model = Languages
        fields = "__all__"


class NavbarSerializer(ModelSerializer):
    class Meta:
        model = Navbar
        fields = "__all__"


class HeaderlabelSerializer(ModelSerializer):
    class Meta:
        model = Headerlabels
        fields = "__all__"


class CategoriesSerializer(ModelSerializer):
    class Meta:
        model = Categories
        exclude = ["product_count"]


class TagsSerializer(ModelSerializer):
    class Meta:
        model = Tags
        fields = "__all__"
