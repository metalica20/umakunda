from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets, views
from django.core.serializers import serialize
from .models import District, Municipality, River, Settlement, Contour, LandResidental, LandUse, Road
import json
from rest_framework.response import Response


class Map(TemplateView):

    def get(self, request, *args, **kwargs):
        sidebar = 1
        return render(request, 'map.html', {"sidebar": sidebar})


class DistrictGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', District.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name', 'code'))

        # print(serializers)
        district = json.loads(serializers)
        return Response(district)


class MunicipalityGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', Municipality.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name', 'code'))

        # print(serializers)
        municipality = json.loads(serializers)
        return Response(municipality)


class RiverGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', River.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name', 'type'))

        # print(serializers)
        river = json.loads(serializers)
        return Response(river)


class SettlementGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', Settlement.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name',))

        # print(serializers)
        settlement = json.loads(serializers)
        return Response(settlement)


class ContourGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', Contour.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name',))

        # print(serializers)
        contour = json.loads(serializers)
        return Response(contour)


class LandResidentalGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', LandResidental.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name',))

        # print(serializers)
        land_residental = json.loads(serializers)
        return Response(land_residental)


class LandUseGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', LandUse.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name',))

        # print(serializers)
        land_use = json.loads(serializers)
        return Response(land_use)


class RoadGeojson(views.APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        serializers = serialize('geojson', Road.objects.all(), geometry_field='boundary',
                                fields=('pk', 'name',))

        # print(serializers)
        road = json.loads(serializers)
        return Response(road)
