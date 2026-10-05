from rest_framework import serializers
from .models import ContactPageContent, ContactInfo, ContactSocialLink


class ContactPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageContent
        fields = "__all__"


class ContactSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSocialLink
        fields = ["id", "image", "url", "label"]


class ContactInfoSerializer(serializers.ModelSerializer):
    social_links = ContactSocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = ContactInfo
        fields = "__all__"