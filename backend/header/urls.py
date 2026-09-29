from rest_framework.routers import DefaultRouter
from .views import LogoViewSet, LanguagesViewSet, NavbarViewSet, headerlabelsViewSet

header_router = DefaultRouter()
header_router.register(r'header_labels', headerlabelsViewSet, basename='header_labels')
header_router.register(r'navbars', NavbarViewSet, basename='navbars')
header_router.register(r'logos', LogoViewSet, basename='logos')
header_router.register(r'languages', LanguagesViewSet, basename='languages')