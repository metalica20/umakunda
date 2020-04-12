from django.core.management.base import BaseCommand
import pandas as pd
from map.models import Province, District
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
            district = [
                District(
                    province_id=Province.objects.get(code=df['provinceid'][row]),
                    name=(df['name'][row]).capitalize().strip(),
                    code=int(df['id'][row]),
                    boundary=GEOSGeometry(df['geom'][row]),

                ) for row in range(0, upper_range)
            ]
            district_data = District.objects.bulk_create(district)

            if district_data:
                self.stdout.write('Successfully loaded District data ..')


        except Exception as e:
            print(e)
