from .models import FooterLabel, PartnerCta
from .serializers import FooterLabelSerializer, PartnerCtaSerializer
from base.views import FilteredReadOnlyViewSet

class FooterLabelViewSet(FilteredReadOnlyViewSet):
    queryset = FooterLabel.objects.all().order_by('id')
    serializer_class = FooterLabelSerializer
    filter_fields = ('lang',)


class PartnerCtaViewSet(FilteredReadOnlyViewSet):
    queryset = PartnerCta.objects.all().order_by('id')
    serializer_class = PartnerCtaSerializer
    filter_fields = ('lang',)
