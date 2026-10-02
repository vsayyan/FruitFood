from rest_framework.routers import DefaultRouter
from .views import LogoViewSet, LanguagesViewSet, NavbarViewSet, HeaderlabelsViewSet, CategoriesViewSet, TagsViewSet

header_router = DefaultRouter(trailing_slash=False)
header_router.register(r'header_labels', HeaderlabelsViewSet, basename='header_labels')
header_router.register(r'navbars', NavbarViewSet, basename='navbars')
header_router.register(r'logos', LogoViewSet, basename='logos')
header_router.register(r'languages', LanguagesViewSet, basename='languages')
header_router.register(r'categories', CategoriesViewSet, basename='categories')
header_router.register(r'tags', TagsViewSet, basename='tags')