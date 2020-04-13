from django.urls import path
from . import views

urlpatterns = [
    path('district', views.DistrictGeojson.as_view(), name='district'),
    path('municipality', views.MunicipalityGeojson.as_view(), name='municipality'),
    path('river', views.RiverGeojson.as_view(), name='river'),
    path('settlement', views.SettlementGeojson.as_view(), name='settlement'),
    path('contour', views.ContourGeojson.as_view(), name='contour'),
    path('land-residental', views.LandResidentalGeojson.as_view(), name='land-residental'),
    path('land-use', views.LandUseGeojson.as_view(), name='land-use'),
    path('road', views.RoadGeojson.as_view(), name='road'),
]
