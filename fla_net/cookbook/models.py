from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone

from accounts.models import Account



class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    supported = models.BooleanField(default=False)


    def __str__(self):
        return self.name



class Couple(models.Model):
    title = models.CharField(max_length=120)
    date_published = models.DateTimeField(default=timezone.now())
    date_last_updated = models.DateTimeField(default=timezone.now())
    ingredients = models.ManyToManyField(Ingredient, through='InCouple')
    author = models.ForeignKey(Account, on_delete=models.CASCADE)


class InCouple(models.Model):
    couple = models.ForeignKey(Couple, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        unique_together=('couple', 'ingredient')


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)


class Recipe(models.Model):

    REGIONS = (
        ('af', 'African'),
        ('ea', 'East Asian'),
        ('eeu', 'Eastern European'),
        ('la', 'Latin American'),
        ('mde', 'Middle Eastern'),
        ('na', 'North American'),
    )

    title = models.CharField(max_length=120)
    date_published = models.DateTimeField(default=timezone.now())
    date_last_updated = models.DateTimeField(default=timezone.now())
    cooking_time = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    hands_on_time = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    ingredients = models.ManyToManyField(Ingredient, through='InRecipe')
    couple = models.ForeignKey(Couple, null=True, on_delete=models.SET_NULL, unique=True)
    region = models.CharField(max_length=4, choices=REGIONS, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    servings = models.IntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return self.title


class RecipeImage(models.Model):
    picture = models.ImageField(upload_to='images')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together=('picture', 'recipe')


class InRecipe(models.Model):

    UNITS = (
        ('ml', 'Milliliters'),
        ('g', 'Grams'),
        ('l', 'Liters'),
        ('kg', 'Kilograms'),
        ('cp', 'Cups'),
        ('pc', 'Pieces'),
        ('tsp', 'Teaspoons'),
        ('tbsp', 'Tablespoons'),
    )

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField(validators=[MinValueValidator(0)])
    unit = models.CharField(max_length=2, choices=UNITS)

    def __str__(self):
        return str.format('{}_{}'.format(self.recipe.id, self.ingredient.name))


    class Meta:
        db_table = 'cookbook_inrecipe'


class Description(models.Model):
    order = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together=('order', 'recipe')


class Comment(models.Model):
    content = models.CharField(max_length=400)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    date_published = models.DateTimeField(default=timezone.now())
    date_last_updated = models.DateTimeField(default=timezone.now())


class Vote(models.Model):
    rate = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    author = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together=('author', 'recipe')


class Fridge(models.Model):
    pass

