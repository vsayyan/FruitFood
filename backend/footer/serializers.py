from rest_framework import serializers

from base.serializers import ModelSerializer
from .models import FooterLabel, SocialLink, PartnerCta

class SocialLinkSerializer(ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'image', 'url', 'label']

class FooterLabelSerializer(ModelSerializer):
    social_links = SocialLinkSerializer(many=True)

    class Meta:
        model = FooterLabel
        fields = ['id', 'lang', 'title', 'image', 'description', 'copyright', 'subtitle', 'address', 'email', 'social_links', 'links_label']

    def create(self, validated_data):
        social_links_data = validated_data.pop('social_links')
        footer = FooterLabel.objects.create(**validated_data)
        
        for link_data in social_links_data:
            SocialLink.objects.create(footer=footer, **link_data)
            
        return footer


class PartnerCtaSerializer(ModelSerializer):
    class Meta:
        model = PartnerCta
        fields = '__all__'
