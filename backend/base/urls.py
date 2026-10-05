"""
URL configuration for base project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from header.urls import header_router
from footer.urls import footer_router
<<<<<<< HEAD
from product.urls import product_router
from about.urls import about_router
from contact.urls import contact_router
from homepage.urls import homepage_router
=======

>>>>>>> b5fe05fbe93034e5c737df8cda7be51943d50185
router = DefaultRouter(trailing_slash=False)

router.registry.extend(header_router.registry)
router.registry.extend(footer_router.registry)
<<<<<<< HEAD
router.registry.extend(product_router.registry)
router.registry.extend(about_router.registry)
router.registry.extend(contact_router.registry)
router.registry.extend(homepage_router.registry)
=======

>>>>>>> b5fe05fbe93034e5c737df8cda7be51943d50185
urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)