from rest_framework.routers import DefaultRouter
from .views import ContactPageContentViewSet, ContactInfoViewSet

contact_router = DefaultRouter(trailing_slash=False)
contact_router.register("contact_page_contents", ContactPageContentViewSet, basename="contact_page_contents")
contact_router.register("contact_info", ContactInfoViewSet, basename="contact_info")