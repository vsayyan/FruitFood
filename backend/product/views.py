from base.views import FilteredReadOnlyViewSet
from .models import Product, ProductPageLabel, TagIcon
from .serializers import ProductSerializer, ProductPageLabelSerializer, TagIconSerializer


class ProductViewSet(FilteredReadOnlyViewSet):
    queryset = Product.objects.prefetch_related("gallery", "variants")
    serializer_class = ProductSerializer
    filter_fields = ["lang", "slug", "category_slug"]


class ProductPageLabelViewSet(FilteredReadOnlyViewSet):
    queryset = ProductPageLabel.objects.all()
    serializer_class = ProductPageLabelSerializer
    filter_fields = ["lang"]


class TagIconViewSet(FilteredReadOnlyViewSet):
    queryset = TagIcon.objects.all()
    serializer_class = TagIconSerializer
    filter_fields = ["code"]
