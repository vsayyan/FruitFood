from rest_framework.response import Response
from .models import Logo,Languages,Navbar,Headerlabels,Categories,Tags
from .serializers import LogoSerializer,LanguagesSerializer,NavbarSerializer,HeaderlabelSerializer,CategoriesSerializer,TagsSerializer
from rest_framework import viewsets
from base.views import FilteredReadOnlyViewSet


class LogoViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ()
    queryset = Logo.objects.all()
    serializer_class = LogoSerializer
    def list(self, request, *args, **kwargs):
        instance = self.get_queryset().first()

        if instance:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        
        return Response({})

class LanguagesViewSet(FilteredReadOnlyViewSet):
    queryset = Languages.objects.all().order_by('id')
    serializer_class = LanguagesSerializer
    filter_fields = ()  

class NavbarViewSet(FilteredReadOnlyViewSet):
    queryset = Navbar.objects.all().order_by('id')
    serializer_class = NavbarSerializer
    filter_fields = ("lang", "url")


class HeaderlabelsViewSet(FilteredReadOnlyViewSet):
    queryset = Headerlabels.objects.all().order_by('id')
    serializer_class = HeaderlabelSerializer
    filter_fields = ("lang",)

class CategoriesViewSet(FilteredReadOnlyViewSet):
    queryset = Categories.objects.all().order_by('id')
    serializer_class = CategoriesSerializer
    filter_fields = ("lang","slug")

class TagsViewSet(FilteredReadOnlyViewSet):
    queryset = Tags.objects.all().order_by('id')
    serializer_class = TagsSerializer
    filter_fields = ("lang",)