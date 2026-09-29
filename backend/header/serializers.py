from dataclasses import fields
from rest_framework import serializers
from .models import Logo,Languages,Navbar,headerlabels

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

class headerlabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = headerlabels
        fields = '__all__'