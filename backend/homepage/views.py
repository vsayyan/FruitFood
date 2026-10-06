from base.views import FilteredReadOnlyViewSet
from .models import (
    HomepageHero, HomeAssortment, Stat, PhilosophyHeading, PhilosophyText,
    FaqSmall, FaqHeading, Faq,
)
from .serializers import (
    HomepageHeroSerializer, HomeAssortmentSerializer, StatSerializer,
    PhilosophyHeadingSerializer, PhilosophyTextSerializer,
    FaqSmallSerializer, FaqHeadingSerializer, FaqSerializer,
)


class HomepageHeroViewSet(FilteredReadOnlyViewSet):
    queryset = HomepageHero.objects.prefetch_related("slider")
    serializer_class = HomepageHeroSerializer
    filter_fields = ["lang"]


class HomeAssortmentViewSet(FilteredReadOnlyViewSet):
    queryset = HomeAssortment.objects.prefetch_related("cards")
    serializer_class = HomeAssortmentSerializer
    filter_fields = ["lang"]


class StatViewSet(FilteredReadOnlyViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    filter_fields = ["lang"]


class PhilosophyHeadingViewSet(FilteredReadOnlyViewSet):
    queryset = PhilosophyHeading.objects.all()
    serializer_class = PhilosophyHeadingSerializer
    filter_fields = ["lang"]


class PhilosophyTextViewSet(FilteredReadOnlyViewSet):
    queryset = PhilosophyText.objects.prefetch_related("images")
    serializer_class = PhilosophyTextSerializer
    filter_fields = ["lang"]


class FaqSmallViewSet(FilteredReadOnlyViewSet):
    queryset = FaqSmall.objects.all()
    serializer_class = FaqSmallSerializer
    filter_fields = ["lang"]


class FaqHeadingViewSet(FilteredReadOnlyViewSet):
    queryset = FaqHeading.objects.all()
    serializer_class = FaqHeadingSerializer
    filter_fields = ["lang"]


class FaqViewSet(FilteredReadOnlyViewSet):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer
    filter_fields = ["lang"]
