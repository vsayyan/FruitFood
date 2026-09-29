from .models import FooterLabel
from .serializers import FooterLabelSerializer
from rest_framework import viewsets

class BaseArrayListViewSet(viewsets.ModelViewSet):
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

class FooterLabelViewSet(BaseArrayListViewSet):
    queryset = FooterLabel.objects.all().order_by('id')
    serializer_class = FooterLabelSerializer