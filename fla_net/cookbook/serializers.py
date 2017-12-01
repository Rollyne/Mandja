from rest_framework import serializers

from .models import Recipe, Comment, Ingredient, InRecipe, Description, RecipeImage, Couple, InCouple, Category
from accounts.serializers import AccountSerializer


class CommentSerializer(serializers.ModelSerializer):

    author = serializers.SlugField(source='author.user.username', read_only=True)
    author_id = serializers.SlugField(source='author.id', read_only=True)
    date_published = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
    date_last_updated = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'is_owner', 'author', 'author_id', 'content', 'date_published', 'date_last_updated']
    #
    # def create(self, validated_data):
    #     recipe = validated_data.pop('recipe')
    #     recipe = Recipe.objects.get(id=recipe['id'])
    #     comment = Comment.objects.create(recipe=recipe, **validated_data)
    #     return comment
    def get_is_owner(self, comment):
        return comment.author.user.id==self.context['request'].user.id




class IngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    class Meta:
        model = Ingredient
        fields = ['id', 'name']


class InrecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredient_id = serializers.IntegerField(source='ingredient.id')
    ingredient_name = serializers.SlugField(source='ingredient.name', required=False)
    unit_display = serializers.SerializerMethodField()

    class Meta:
        model = InRecipe
        fields = ['ingredient_id','ingredient_name', 'quantity', 'unit_display']

    def create(self, validated_data):
        ingredient_data = validated_data.pop('ingredient')
        ingredient = Ingredient.objects.get(id=ingredient_data['id'])

        inrecipe = InRecipe.objects.create(ingredient=ingredient, **validated_data)
        return inrecipe

    def get_unit_display(self, inrecipe):
        return inrecipe.get_unit_display()



class DescriptionSerializer(serializers.ModelSerializer):
    recipe = serializers.SlugField(source='recipe.id', required=False)

    class Meta:
        model = Description
        fields = ['recipe', 'order', 'content']


class RecipeImageSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True, read_only=True)
    id = serializers.IntegerField(required=False, read_only=True)
    class Meta:
        model = RecipeImage
        fields = ['url', 'id', 'picture']


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    class Meta:
        model = Category
        exclude = ('parent', )


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = InrecipeSerializer(source='inrecipe_set', many=True, required=False, read_only=True)
    descriptions = DescriptionSerializer(source='description_set', many=True, required=False, read_only=True)
    comments = CommentSerializer(source='comment_set', read_only=True, many=True)
    author = AccountSerializer('author', required=False, read_only=True)
    images = RecipeImageSerializer(source='recipeimage_set', many=True, read_only=True)
    date_published = serializers.DateTimeField(format='%d/%m/%Y',read_only=True)
    date_last_updated = serializers.DateTimeField(format='%d/%m/%Y', read_only=True)
    is_owner = serializers.SerializerMethodField(read_only=True)
    region_display = serializers.SerializerMethodField()
    category = CategorySerializer(required=False,read_only=True)

    class Meta:
        model = Recipe
        exclude = ['couple',]

    def get_is_owner(self, recipe):
        return recipe.author.user.id==self.context['request'].user.id

    def get_region_display(self, recipe):
        return recipe.get_region_display()


class RecipeIndexSerializer(serializers.ModelSerializer):
    images = RecipeImageSerializer(source='recipeimage_set', many=True, read_only=True)
    author = AccountSerializer('author', required=False, read_only=True)
    date_published = serializers.DateTimeField(format='%d/%m/%Y', read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'images','date_published', 'author']


class IncoupleSerializer(serializers.ModelSerializer):
    ingredient_id = serializers.SlugField(source='ingredient.id', required=False)
    ingredient_name = serializers.SlugField(source='ingredient.name', required=False)

    class Meta:
        model = InRecipe
        fields = ['id', 'ingredient_id', 'ingredient_name']

    def create(self, validated_data):
        ingredient_data = validated_data.pop('ingredient')
        ingredient = Ingredient.objects.get(name=ingredient_data['name'])

        incouple = InCouple.objects.create(ingredient=ingredient, **validated_data)
        return incouple


class CoupleSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(format='%d/%m/%Y',read_only=True)
    date_last_updated = serializers.DateTimeField(format='%d/%m/%Y', read_only=True)
    ingredients = IncoupleSerializer(source='incouple_set', many=True, required=False, read_only=True)

    class Meta:
        model = Couple
        exclude = ('author',)
