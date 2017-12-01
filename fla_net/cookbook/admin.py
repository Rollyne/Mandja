from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Recipe)
admin.site.register(InRecipe)
admin.site.register(Description)
admin.site.register(Ingredient)
admin.site.register(Comment)
admin.site.register(InCouple)
admin.site.register(Couple)
admin.site.register(Vote)
admin.site.register(Category)