from numpy import unicode
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, renderer_classes, permission_classes, authentication_classes, \
    parser_classes
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics
from rest_framework.request import Request

from fla_net.views import BaseManageView

from accounts.models import Account
from .models import Recipe, Comment, Ingredient, InRecipe, RecipeImage
from .serializers import RecipeSerializer, CommentSerializer, IngredientSerializer, InrecipeSerializer, \
    DescriptionSerializer, RecipeImageSerializer

import ast


# Create your views here.

@api_view(['GET'])
def api_root(request, fromat=None):
    return Response({
        'recipes': reverse('cookbook:recipe-list', request=request, format=format),

    })

# -----------------------------------------------------

from rest_framework import parsers
from formencode.variabledecode import variable_decode

class MultipartFormencodeParser(parsers.MultiPartParser):

    def parse(self, stream, media_type=None, parser_context=None):
        result = super().parse(
            stream,
            media_type=media_type,
            parser_context=parser_context
        )
        data = variable_decode(result.data)
        return parsers.DataAndFiles(data, result.files)

#@renderer_classes((JSONRenderer, ))
class RecipeList(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated, ))
class RecipeCreate(generics.CreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )
    parser_classes = (MultipartFormencodeParser, )

    def create(self, request, *args, **kwargs):
        recipe_data = request.data
        ingredients_data = ast.literal_eval(recipe_data.pop('ingredients'))
        descriptions_data = ast.literal_eval(recipe_data.pop('descriptions'))

        recipe_serializer = RecipeSerializer(data=recipe_data)
        ingredients_serializer = InrecipeSerializer(data=ingredients_data, many=True)
        descriptions_serializer = DescriptionSerializer(data=descriptions_data, many=True)

        r_is_valid = recipe_serializer.is_valid()
        i_is_valid = ingredients_serializer.is_valid()
        d_is_valid = descriptions_serializer.is_valid()

        if r_is_valid and i_is_valid and d_is_valid:
            recipe_serializer.save(author=Account.objects.get(user__id=request.user.id))
            recipe = recipe_serializer.instance
            descriptions_serializer.save(recipe=recipe)
            ingredients_serializer.save(recipe=recipe)
            [RecipeImage.objects.create(recipe=recipe, picture=request.FILES[key]) for key in request.FILES]

            return Response({'message': 'Success!'}, status=200)
        else:
            return Response([recipe_serializer.errors,
                             ingredients_serializer.errors,
                             descriptions_serializer.errors,])


#@renderer_classes((JSONRenderer, ))
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer

    def get(self, request, *args, **kwargs):
        queryset = Recipe.objects.get(id=kwargs['pk'])

        context = {
            'request': Request(request)
        }

        serializer = RecipeSerializer(queryset, context=context)
        return Response(serializer.data)


class RecipeManageView(BaseManageView):
        VIEWS_BY_METHOD = {
            'GET': RecipeList.as_view,
            'POST': RecipeCreate.as_view,
        }

# -----------------------------------------------------


@renderer_classes((JSONRenderer, ))
class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    authentication_classes = (TokenAuthentication,)

    def list(self, request, *args, **kwargs):
        id = kwargs['pk']
        queryset = Comment.objects.filter(recipe__id=id)

        context = {
            'request': Request(request)
        }

        serializer = CommentSerializer(queryset, many=True, context=context)
        return Response(serializer.data)
    def perform_create(self, serializer, *args, **kwargs):
        recipe_id = self.request.parser_context['kwargs']['pk']
        serializer.save(author=Account.objects.get(user__id=self.request.user.id), recipe=Recipe.objects.get(id=recipe_id))



@renderer_classes((JSONRenderer, ))
class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()

# -----------------------------------------------------

@renderer_classes((JSONRenderer, ))
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


@renderer_classes((JSONRenderer, ))
class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        return Ingredient.objects.all()

# -----------------------------------------------------

@renderer_classes((JSONRenderer, ))
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
