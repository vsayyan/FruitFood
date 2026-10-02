from dataclasses import fields
from rest_framework import serializers
from .models import Logo,Languages,Navbar,Headerlabels,Categories,Tags

class LogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo
        fields = '__all__'
class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = '__all__'
class NavbarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Navbar
        fields = '__all__'

class HeaderlabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Headerlabels
        fields = '__all__'
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'