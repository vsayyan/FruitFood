from rest_framework import viewsets

class FilteredReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    filter_fields = ('lang',)

    def get_queryset(self):
        qs = super().get_queryset()
        for field in self.filter_fields:
            value = self.request.query_params.get(field)
            if value is not None:
                qs = qs.filter(**{field: value})
        return qs