from base.views import FilteredReadOnlyViewSet
from .models import (
    AboutProduction, 
    AboutWhyTrustUs, 
    AboutShowcase, 
    AboutQualityNaturalness, 
    AboutPhilosophy, 
    AboutPhilosophyFact, 
    AboutPageLabel,
    AboutIntro
)
from .serializers import (
    AboutProductionSerializer, 
    AboutWhyTrustUsSerializer, 
    AboutShowcaseSerializer,
    AboutQualityNaturalnessSerializer, 
    AboutPhilosophySerializer,
    AboutPhilosophyFactSerializer, 
    AboutPageLabelSerializer,
    AboutIntroSerializer
)

class AboutIntroViewSet(FilteredReadOnlyViewSet):
    queryset = AboutIntro.objects.prefetch_related("slider")
    serializer_class = AboutIntroSerializer
    filter_fields = ["lang"]


class AboutProductionViewSet(FilteredReadOnlyViewSet):
    queryset = AboutProduction.objects.prefetch_related("directions")
    serializer_class = AboutProductionSerializer
    filter_fields = ["lang"]


class AboutWhyTrustUsViewSet(FilteredReadOnlyViewSet):
    queryset = AboutWhyTrustUs.objects.prefetch_related("stats")
    serializer_class = AboutWhyTrustUsSerializer
    filter_fields = ["lang"]


class AboutShowcaseViewSet(FilteredReadOnlyViewSet):
    queryset = AboutShowcase.objects.prefetch_related("images")
    serializer_class = AboutShowcaseSerializer
    filter_fields = ["lang"]
class AboutQualityNaturalnessViewSet(FilteredReadOnlyViewSet):
    queryset = AboutQualityNaturalness.objects.all()
    serializer_class = AboutQualityNaturalnessSerializer
    filter_fields = ["lang"]


class AboutPhilosophyViewSet(FilteredReadOnlyViewSet):
    queryset = AboutPhilosophy.objects.all()
    serializer_class = AboutPhilosophySerializer
    filter_fields = ["lang"]


class AboutPhilosophyFactViewSet(FilteredReadOnlyViewSet):
    queryset = AboutPhilosophyFact.objects.all()
    serializer_class = AboutPhilosophyFactSerializer
    filter_fields = ["lang"]


class AboutPageLabelViewSet(FilteredReadOnlyViewSet):
    queryset = AboutPageLabel.objects.all()
    serializer_class = AboutPageLabelSerializer
    filter_fields = ["lang"]