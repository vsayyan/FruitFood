from django.shortcuts import render
from base.views import FilteredReadOnlyViewSet
from .models import Product,ProductPageLabel
from .serializers import ProductSerializer,ProductPageLabelSerializer


class ProductViewSet(FilteredReadOnlyViewSet):
    queryset = Product.objects.prefetch_related("variants")
    serializer_class = ProductSerializer
    filter_fields = ["lang", "slug", "category_slug"]

class ProductPageLabelViewSet(FilteredReadOnlyViewSet):
    queryset = ProductPageLabel.objects.all()
    serializer_class = ProductPageLabelSerializer
    filter_fields = ["lang"]  