from django.core.management.base import BaseCommand
import pandas as pd
from map.models import River
from django.contrib.gis.geos import GEOSGeometry


class Command(BaseCommand):
    help = 'load province data from province.xlsx file'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        path = kwargs['path']

        df = pd.read_csv(path)
        upper_range = len(df)
        print("Wait Data is being Loaded")

        try:
            river = [
                River(
                    name=str(df['name'][row]).capitalize().strip(),
                    type=str(df['waterway'][row]),
                    boundary=GEOSGeometry(df['the_geom'][row]),

                ) for row in range(0, upper_range)
            ]
            river_data = River.objects.bulk_create(river)

            if river_data:
                self.stdout.write('Successfully loaded river data ..')


        except Exception as e:
            print(e)
