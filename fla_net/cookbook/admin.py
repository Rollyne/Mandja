from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Recipe)
admin.site.register(InRecipe)
admin.site.register(Account)
admin.site.register(Description)
admin.site.register(Ingredient)
admin.site.register(Comment)