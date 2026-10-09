from rest_framework.routers import DefaultRouter
from .views import FooterLabelViewSet, PartnerCtaViewSet

footer_router = DefaultRouter(trailing_slash=False)
footer_router.register(r'footer_labels', FooterLabelViewSet, basename='footer_labels')
footer_router.register(r'partner_cta', PartnerCtaViewSet, basename='partner_cta')
