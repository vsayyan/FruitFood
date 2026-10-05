from rest_framework.routers import DefaultRouter
from .views import HomepageHeroViewSet, HomeAssortmentViewSet

homepage_router = DefaultRouter(trailing_slash=False)
homepage_router.register("homepage_hero", HomepageHeroViewSet, basename="homepage_hero")
homepage_router.register("home_assortment", HomeAssortmentViewSet, basename="home_assortment")