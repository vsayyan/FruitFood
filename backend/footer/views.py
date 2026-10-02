from .models import FooterLabel
from .serializers import FooterLabelSerializer
from rest_framework import viewsets
from base.views import FilteredReadOnlyViewSet

class FooterLabelViewSet(FilteredReadOnlyViewSet):
    queryset = FooterLabel.objects.all().order_by('id')
    serializer_class = FooterLabelSerializer
    filter_fields = ('lang',)