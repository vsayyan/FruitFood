from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductPageLabelViewSet

product_router = DefaultRouter(trailing_slash=False)
product_router.register("products", ProductViewSet, basename="products")
product_router.register("products-page-label", ProductPageLabelViewSet, basename="products-page-label")