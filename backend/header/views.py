from rest_framework.response import Response
from .models import Logo,Languages,Navbar,headerlabels
from .serializers import LogoSerializer,LanguagesSerializer,NavbarSerializer,headerlabelSerializer
from rest_framework import viewsets


class BaseArrayListViewSet(viewsets.ModelViewSet):
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class LogoViewSet(viewsets.ModelViewSet):
    queryset = Logo.objects.all()
    serializer_class = LogoSerializer
    def list(self, request, *args, **kwargs):
        instance = self.get_queryset().first()

        if instance:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        
        return Response({})

class LanguagesViewSet(BaseArrayListViewSet):
    queryset = Languages.objects.all().order_by('id')
    serializer_class = LanguagesSerializer
class NavbarViewSet(BaseArrayListViewSet):
    queryset = Navbar.objects.all().order_by('id')
    serializer_class = NavbarSerializer
class headerlabelsViewSet(BaseArrayListViewSet):
    queryset = headerlabels.objects.all().order_by('id')
    serializer_class = headerlabelSerializer