from rest_framework.routers import DefaultRouter
from .views import GeographyContentViewSet, ExportCountryViewSet

geography_router = DefaultRouter(trailing_slash=False)
geography_router.register("geography_contents", GeographyContentViewSet, basename="geography_contents")
geography_router.register("export_countries", ExportCountryViewSet, basename="export_countries")