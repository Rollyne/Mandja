from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics
from rest_framework.request import Request

from .models import Recipe, Account, Comment, Ingredient, InRecipe
from .serializers import RecipeSerializer, AccountSerializer, CommentSerializer, IngredientSerializer, InrecipeSerializer

# Create your views here.

@api_view(['GET'])
def api_root(request, fromat=None):
    return Response({
        'recipes': reverse('cookbook:recipe-list', request=request, format=format),

    })

# -----------------------------------------------------

class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer

    def get(self, request, *args, **kwargs):
        queryset = Recipe.objects.get(id=kwargs['pk'])

        context = {
            'request': Request(request)
        }

        serializer = RecipeSerializer(queryset, context=context)
        return Response(serializer.data)

# -----------------------------------------------------

class AccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer


    def get_queryset(self):
        return Account.objects.all()

# -----------------------------------------------------

class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def list(self, request, *args, **kwargs):
        id = kwargs['pk']
        queryset = Comment.objects.filter(recipe__id=id)

        context = {
            'request': Request(request)
        }

        serializer = CommentSerializer(queryset, many=True, context=context)
        return Response(serializer.data)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()

# -----------------------------------------------------

class IngredientList(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def list(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            id = kwargs['pk']
            queryset = Ingredient.objects.filter(recipe__id=id)
        else:
            queryset = Ingredient.objects.all()

        context = {
            'request': Request(request)
        }

        serializer = IngredientSerializer(queryset, many=True, context=context)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if Ingredient.objects.filter(name=self.request.data['name']).exists():
            raise ValidationError('This ingredient already exists')
        serializer.save()


class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        return Ingredient.objects.all()

# -----------------------------------------------------

class InrecipeList(generics.ListCreateAPIView):
    serializer_class = InrecipeSerializer
    queryset = InRecipe.objects.all()

    def list(self, request, *args, **kwargs):

        id = kwargs['pk']
        queryset = InRecipe.objects.filter(recipe__id=id)

        context = {
            'request': Request(request)
        }

        serializer = InrecipeSerializer(queryset, many=True, context=context)
        return Response(serializer.data)
