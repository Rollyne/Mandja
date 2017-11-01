from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Ingredient(models.Model):
    name = models.CharField(max_length=50)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Recipe(models.Model):
    title = models.CharField(max_length=120)
    date_published = models.DateField(default=timezone.now())
    date_last_updated = models.DateField(default=timezone.now())
    cooking_time = models.IntegerField(null=True)
    hands_on_time = models.IntegerField(null=True)
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    ingredients = models.ManyToManyField(Ingredient)


class Description(models.Model):
    order = models.IntegerField()
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)


class Comment(models.Model):
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)
    date_published = models.DateField()
    date_last_updated = models.DateField()

