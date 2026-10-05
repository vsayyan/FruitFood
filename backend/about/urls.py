from rest_framework.routers import DefaultRouter
from .views import (
    AboutProductionViewSet, AboutWhyTrustUsViewSet, AboutShowcaseViewSet,
    AboutQualityNaturalnessViewSet, AboutPhilosophyViewSet,
    AboutPhilosophyFactViewSet, AboutPageLabelViewSet,
    AboutIntroViewSet
)

about_router = DefaultRouter(trailing_slash=False)
about_router.register("about_production", AboutProductionViewSet, basename="about_production")
about_router.register("about_why_trust_us", AboutWhyTrustUsViewSet, basename="about_why_trust_us")
about_router.register("about_showcase", AboutShowcaseViewSet, basename="about_showcase")
about_router.register("about_quality_naturalness", AboutQualityNaturalnessViewSet, basename="about_quality_naturalness")
about_router.register("about_philosophy", AboutPhilosophyViewSet, basename="about_philosophy")
about_router.register("about_philosophy_facts", AboutPhilosophyFactViewSet, basename="about_philosophy_facts")
about_router.register("about_page_labels", AboutPageLabelViewSet, basename="about_page_labels")
about_router.register("about_intro", AboutIntroViewSet, basename="about_intro")