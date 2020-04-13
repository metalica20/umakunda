from django.contrib.gis.db import models


# Create your models here.

class Province(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    code = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class District(models.Model):
    province_id = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='DistrictProvince', null=True,
                                    blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    code = models.IntegerField(default=0)
    boundary = models.MultiPolygonField(srid=4326, null=True)

    def __str__(self):
        return self.name


class Municipality(models.Model):
    province_id = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='MunProvince', null=True,
                                    blank=True)
    district_id = models.ForeignKey(District, on_delete=models.CASCADE, related_name='MunDistrict', null=True,
                                    blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    municipality_type = models.CharField(max_length=100, null=True, blank=True)
    hlcit_code = models.CharField(max_length=100, null=True, blank=True)
    code = models.IntegerField(default=0)
    boundary = models.MultiPolygonField(srid=4326, null=True)

    def __str__(self):
        return self.name


class TestData(models.Model):
    multipolygon = models.MultiPolygonField(srid=4326, null=True)
    Point = models.PointField(srid=4326, null=True)
    Linestring = models.LineStringField(srid=4326, null=True)
    Multistring = models.MultiLineStringField(srid=4326, null=True)
    Multipoint = models.MultiPointField(srid=4326, null=True)


class River(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.MultiLineStringField(srid=4326, null=True)

    def __str__(self):
        return self.type


class Settlement(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.PointField(srid=4326, null=True)

    def __str__(self):
        return self.name


class Contour(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.MultiLineStringField(srid=4326, null=True)

    def __str__(self):
        return self.name


class LandResidental(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.MultiPolygonField(srid=4326, null=True)

    def __str__(self):
        return self.name


class LandUse(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.MultiPolygonField(srid=4326, null=True)

    def __str__(self):
        return self.name


class Road(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    length = models.CharField(max_length=100, null=True, blank=True)
    boundary = models.MultiLineStringField(srid=4326, null=True)

    def __str__(self):
        return self.name
