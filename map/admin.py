from django.contrib import admin
from .models import Province, District, Municipality, River, Settlement, Contour

# Register your models here.
admin.site.register(Province)
admin.site.register(Municipality)
admin.site.register(District)
admin.site.register(River)
admin.site.register(Settlement)
admin.site.register(Contour)
