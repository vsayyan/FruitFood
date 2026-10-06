from base.views import FilteredReadOnlyViewSet
from .models import GeographyContent, ExportCountry
from .serializers import GeographyContentSerializer, ExportCountrySerializer


class GeographyContentViewSet(FilteredReadOnlyViewSet):
    queryset = GeographyContent.objects.all()
    serializer_class = GeographyContentSerializer
    filter_fields = ["lang"]


class ExportCountryViewSet(FilteredReadOnlyViewSet):
    queryset = ExportCountry.objects.all()
    serializer_class = ExportCountrySerializer
    filter_fields = ["lang", "code"]