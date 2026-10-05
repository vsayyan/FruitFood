from base.views import FilteredReadOnlyViewSet
from .models import ContactPageContent, ContactInfo
from .serializers import ContactPageContentSerializer, ContactInfoSerializer


class ContactPageContentViewSet(FilteredReadOnlyViewSet):
    queryset = ContactPageContent.objects.all()
    serializer_class = ContactPageContentSerializer
    filter_fields = ["lang"]


class ContactInfoViewSet(FilteredReadOnlyViewSet):
    queryset = ContactInfo.objects.prefetch_related("social_links")
    serializer_class = ContactInfoSerializer
    filter_fields = ["lang"]