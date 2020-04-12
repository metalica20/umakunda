# Generated by Django 2.2.10 on 2020-04-12 20:45

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0004_river'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settlement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('boundary', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
            ],
        ),
    ]
