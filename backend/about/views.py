from base.views import FilteredReadOnlyViewSet
from .models import (
    AboutIntro, AboutProduction, AboutWhyTrustUs, AboutShowcase,
    AboutQualityNaturalness, AboutPhilosophy, AboutPhilosophyFact, AboutPageLabel,
    Brand, ExportCooperation, OurFactory, WeBelieve,
)
from .serializers import (
    AboutIntroSerializer, AboutProductionSerializer, AboutWhyTrustUsSerializer,
    AboutShowcaseSerializer, AboutQualityNaturalnessSerializer, AboutPhilosophySerializer,
    AboutPhilosophyFactSerializer, AboutPageLabelSerializer,
    BrandSerializer, ExportCooperationSerializer, OurFactorySerializer, WeBelieveSerializer,
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


class BrandViewSet(FilteredReadOnlyViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_fields = ["lang", "code"]


class ExportCooperationViewSet(FilteredReadOnlyViewSet):
    queryset = ExportCooperation.objects.all()
    serializer_class = ExportCooperationSerializer
    filter_fields = ["lang"]


class OurFactoryViewSet(FilteredReadOnlyViewSet):
    queryset = OurFactory.objects.prefetch_related("slider", "gallery")
    serializer_class = OurFactorySerializer
    filter_fields = ["lang"]


class WeBelieveViewSet(FilteredReadOnlyViewSet):
    queryset = WeBelieve.objects.all()
    serializer_class = WeBelieveSerializer
    filter_fields = ["lang"]
