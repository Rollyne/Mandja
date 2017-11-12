from rest_framework import serializers

from .models import Recipe, Account, Comment, Ingredient, InRecipe, Description


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')


    class Meta:
        model = Account
        fields = ['id','user']
        extra_kwargs = {
            'url': {
                'view_name': 'cookbook:account-detail',
            }
        }


class CommentSerializer(serializers.HyperlinkedModelSerializer):

    author = serializers.ReadOnlyField(source='user.username')
    recipe = serializers.ReadOnlyField(source='recipe.title')
    parent_id = serializers.ReadOnlyField(source='parent.id')

    class Meta:
        model = Comment
        fields = ['id', 'author', 'recipe', 'parent_id', 'content', 'date_published', 'date_last_updated']
        extra_kwargs = {
            'url':{
                'view_name':'cookbook:comment-detail'
            }
        }


class IngredientSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Ingredient
        fields = ['id', 'name']


class InrecipeSerializer(serializers.HyperlinkedModelSerializer):

    ingredient = serializers.ReadOnlyField(source='ingredient.name')

    class Meta:
        model = InRecipe
        fields = ['ingredient', 'quantity', 'unit']



class DescriptionSerializer(serializers.HyperlinkedModelSerializer):
    recipe_id = serializers.ReadOnlyField(source='recipe.id')

    class Meta:
        model = Description
        fields = ['recipe_id', 'order', 'content']


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.user.username')
    ingredients = InrecipeSerializer(source='inrecipe_set', read_only=True, many=True)
    descriptions = DescriptionSerializer(source='description_set', read_only=True, many=True)
    comments = CommentSerializer(source='comment_set', read_only=True, many=True)

    class Meta:
        model = Recipe
        fields = [ 'id', 'title', 'author', 'date_published', 'date_last_updated', 'cooking_time', 'hands_on_time', 'ingredients', 'descriptions', 'comments']
        extra_kwargs = {
            'url':{
                'view_name':'cookbook:recipe-detail'
            }
        }