from rest_framework.routers import DefaultRouter
from .views import FooterLabelViewSet

footer_router = DefaultRouter()
footer_router.register(r'footer_labels', FooterLabelViewSet, basename='footer_labels')