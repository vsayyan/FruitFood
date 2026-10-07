from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import ContactPageContent, ContactInfo, ContactSocialLink


class ContactPageContentSerializer(ModelSerializer):
    class Meta:
        model = ContactPageContent
        fields = "__all__"


class ContactSocialLinkSerializer(ModelSerializer):
    class Meta:
        model = ContactSocialLink
        fields = ["id", "image", "url", "label"]


class ContactInfoSerializer(ModelSerializer):
    social_links = ContactSocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = ContactInfo
        fields = "__all__"