from base.views import FilteredReadOnlyViewSet
from .models import HomepageHero, HomeAssortment
from .serializers import HomepageHeroSerializer, HomeAssortmentSerializer


class HomepageHeroViewSet(FilteredReadOnlyViewSet):
    queryset = HomepageHero.objects.prefetch_related("slider")
    serializer_class = HomepageHeroSerializer
    filter_fields = ["lang"]


class HomeAssortmentViewSet(FilteredReadOnlyViewSet):
    queryset = HomeAssortment.objects.prefetch_related("cards")
    serializer_class = HomeAssortmentSerializer
    filter_fields = ["lang"]