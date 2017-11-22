from rest_framework import serializers

from .models import Recipe, Comment, Ingredient, InRecipe, Description
from accounts.serializers import AccountSerializer


class CommentSerializer(serializers.ModelSerializer):

    author = serializers.SlugField(source='user.username')
    recipe = serializers.SlugField(source='recipe.id')
    parent_id = serializers.SlugField(source='parent.id')

    class Meta:
        model = Comment
        fields = ['id', 'author', 'recipe', 'parent_id', 'content', 'date_published', 'date_last_updated']



class IngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, read_only=True)
    class Meta:
        model = Ingredient
        fields = ['id', 'name']


class InrecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredient_id = serializers.SlugField(source='ingredient.id')
    ingredient_name = serializers.SlugField(source='ingredient.name', required=False)

    class Meta:
        model = InRecipe
        fields = ['ingredient_id','ingredient_name', 'quantity', 'unit']

    def create(self, validated_data):
        ingredient_data = validated_data.pop('ingredient')
        ingredient = Ingredient.objects.get(id=ingredient_data['id'])

        inrecipe = InRecipe.objects.create(ingredient=ingredient, **validated_data)
        return inrecipe



class DescriptionSerializer(serializers.ModelSerializer):
    recipe = serializers.SlugField(source='recipe.id', required=False)

    class Meta:
        model = Description
        fields = ['recipe', 'order', 'content']


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = InrecipeSerializer(source='inrecipe_set', many=True, required=False, read_only=True)
    descriptions = DescriptionSerializer(source='description_set', many=True, required=False, read_only=True)
    comments = CommentSerializer(source='comment_set', read_only=True, many=True)
    author = AccountSerializer('author', required=False)

    class Meta:
        model = Recipe
        fields = [ 'id', 'title', 'date_published', 'date_last_updated', 'cooking_time', 'hands_on_time', 'ingredients', 'descriptions', 'comments', 'author']