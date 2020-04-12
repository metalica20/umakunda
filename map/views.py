from django.shortcuts import render
from django.views.generic import TemplateView


class Map(TemplateView):

    def get(self, request, *args, **kwargs):
        sidebar = 1
        return render(request, 'map.html', {"sidebar": sidebar})
