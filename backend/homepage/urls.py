from rest_framework.routers import DefaultRouter
from .views import (
    HomepageHeroViewSet, HomeAssortmentViewSet, StatViewSet,
    PhilosophyHeadingViewSet, PhilosophyTextViewSet,
    FaqSmallViewSet, FaqHeadingViewSet, FaqViewSet,
)

homepage_router = DefaultRouter(trailing_slash=False)
homepage_router.register("homepage_hero", HomepageHeroViewSet, basename="homepage_hero")
homepage_router.register("home_assortment", HomeAssortmentViewSet, basename="home_assortment")
homepage_router.register("stats", StatViewSet, basename="stats")
homepage_router.register("philosophy_headings", PhilosophyHeadingViewSet, basename="philosophy_headings")
homepage_router.register("philosophy_text", PhilosophyTextViewSet, basename="philosophy_text")
homepage_router.register("faq_small", FaqSmallViewSet, basename="faq_small")
homepage_router.register("faq_heading", FaqHeadingViewSet, basename="faq_heading")
homepage_router.register("faq", FaqViewSet, basename="faq")
