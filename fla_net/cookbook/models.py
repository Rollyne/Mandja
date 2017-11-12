from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Ingredient(models.Model):
    name = models.CharField(max_length=50)


    def __str__(self):
        return self.name


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


    def __str__(self):
        return self.user.username


class Recipe(models.Model):
    title = models.CharField(max_length=120)
    date_published = models.DateTimeField(default=timezone.now())
    date_last_updated = models.DateTimeField(default=timezone.now())
    cooking_time = models.IntegerField(null=True)
    hands_on_time = models.IntegerField(null=True)
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    ingredients = models.ManyToManyField(Ingredient, through='InRecipe')

    def __str__(self):
        return self.title


class InRecipe(models.Model):

    UNITS = (
        ('ml', 'Mililiters'),
        ('g', 'Grams'),
        ('l', 'Liters'),
        ('kg', 'Kilograms'),
    )

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()
    unit = models.CharField(max_length=2, choices=UNITS)

    def __str__(self):
        return str.format('{}_{}'.format(self.recipe.id, self.ingredient.name))


    class Meta:
        db_table = 'cookbook_inrecipe'


class Description(models.Model):
    order = models.IntegerField()
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)


class Comment(models.Model):
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    date_published = models.DateTimeField(default=timezone.now())
    date_last_updated = models.DateTimeField(default=timezone.now())

