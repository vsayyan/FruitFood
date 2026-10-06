from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductPageLabelViewSet, TagIconViewSet

product_router = DefaultRouter(trailing_slash=False)
product_router.register("products", ProductViewSet, basename="products")
product_router.register("product_page_labels", ProductPageLabelViewSet, basename="product_page_labels")
product_router.register("tag_icons", TagIconViewSet, basename="tag_icons")
