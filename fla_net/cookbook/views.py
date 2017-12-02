from collections import OrderedDict

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from numpy import unicode
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, renderer_classes, permission_classes, authentication_classes, \
    parser_classes
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, filters
from rest_framework.request import Request

import json

from fla_net.views import BaseManageView

from accounts.models import Account
from .models import Recipe, Comment, Ingredient, InRecipe, RecipeImage, Couple, InCouple, Category
from .serializers import RecipeSerializer, CommentSerializer, IngredientSerializer, InrecipeSerializer, \
    DescriptionSerializer, RecipeImageSerializer, CoupleSerializer, IncoupleSerializer, RecipeIndexSerializer, \
    CategorySerializer

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
    serializer_class = RecipeIndexSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('title',)
    ordering = ('date_published',)


    # def list(self, request, *args, **kwargs):
    #     queryset = Recipe.objects.all()
    #
    #     if 'search' in request.query_params:
    #         search = request.query_params['search']
    #         queryset = queryset.filter(title__contains=search)
    #
    #     context = {
    #         'request': Request(request)
    #     }
    #
    #     serializer = self.get_serializer(queryset, many=True, context=context)
    #     return Response(serializer.data)

class RecipeLatestList(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeIndexSerializer
    def list(self, request, *args, **kwargs):
        n = kwargs['n']
        queryset = Recipe.objects.order_by('-date_published')[:int(n)]

        context = {
            'request': Request(request)
        }

        serializer = self.get_serializer(queryset, many=True, context=context)
        return Response(serializer.data)


@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated, ))
class RecipeCreate(generics.CreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )
    parser_classes = (MultipartFormencodeParser, )

    def create(self, request, *args, **kwargs):
        recipe_data = request.data

        ingr_validation = "You should add ingredients."
        instr_validation = "You should add instructions."

        if 'ingredients' not in recipe_data:
            raise ValidationError(ingr_validation)
        if 'descriptions' not in recipe_data:
            raise ValidationError(instr_validation)

        ingredients_data = ast.literal_eval(recipe_data.pop('ingredients'))
        instructions_data = ast.literal_eval(recipe_data.pop('descriptions'))

        category_data = ast.literal_eval(recipe_data.pop('category'))
        category = Category.objects.get(id=category_data['id'])

        if len(ingredients_data) == 0:
            raise ValidationError(ingr_validation)

        if len(instructions_data) == 0:
            raise ValidationError(instr_validation)


        recipe_serializer = RecipeSerializer(data=recipe_data)
        ingredients_serializer = InrecipeSerializer(data=ingredients_data, many=True)
        descriptions_serializer = DescriptionSerializer(data=instructions_data, many=True)

        r_is_valid = recipe_serializer.is_valid()
        i_is_valid = ingredients_serializer.is_valid()
        d_is_valid = descriptions_serializer.is_valid()

        if r_is_valid and i_is_valid and d_is_valid:
            recipe_serializer.save(author=Account.objects.get(user__id=request.user.id), category=category)
            recipe = recipe_serializer.instance
            descriptions_serializer.save(recipe=recipe)
            ingredients_serializer.save(recipe=recipe)
            x = dict(request.FILES)
            for file in x.items():
                for item in file[1]:
                    RecipeImage.objects.create(recipe=recipe, picture=item)

            return Response({'message': 'Success!'}, status=200)
        else:
            raise ValidationError(detail=[recipe_serializer.errors,
                             ingredients_serializer.errors,
                             descriptions_serializer.errors,])


#@renderer_classes((JSONRenderer, ))
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    authentication_classes = (TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        recipe_id = kwargs['pk']
        try:
            queryset = Recipe.objects.get(id=recipe_id)
        except ObjectDoesNotExist:
            raise Http404

        context = {
            'request': Request(request)
        }

        serializer = RecipeSerializer(queryset, context=context)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        if (not instance.author.user.id == self.request.user.id):
            raise PermissionDenied(detail="You do not own this recipe.")
        else:
            instance.delete()


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
    queryset = Comment.objects.all()
    authentication_classes = (TokenAuthentication,)


    def perform_destroy(self, instance):
        if (not instance.author.user.id == self.request.user.id):
            raise PermissionDenied(detail="You do not own this comment.")
        else:
            instance.delete()

# -----------------------------------------------------

@renderer_classes((JSONRenderer, ))
class IngredientList(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

    def list(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            id = kwargs['pk']
            queryset = Ingredient.objects.filter(recipe__id=id)
        elif 'supported' in request.query_params:
            supported = request.query_params['supported']
            queryset = Ingredient.objects.filter(supported=supported)
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

# -----------------------------------------------------

class CategoriesView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

#  -----------------------------------------------------

class CouplesView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Couple.objects.all()
    serializer_class = CoupleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class CouplesList(generics.ListCreateAPIView):
    serializer_class = CoupleSerializer
    queryset = Couple.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=Account.objects.get(user__id=self.request.user.id))


    def list(self, request, *args, **kwargs):
        queryset = Couple.objects.filter(author__user__id=request.user.id)

        context = {
            'request': Request(request)
        }

        serializer = CoupleSerializer(queryset, many=True, context=context)
        return Response(serializer.data)


class InCoupleCreate(generics.CreateAPIView):
    serializer_class = IncoupleSerializer
    queryset = InCouple.objects.all()
    authentication_classes = (TokenAuthentication,)


    def perform_create(self, serializer, *args, **kwargs):
        couple_id = self.request.parser_context['kwargs']['pk']
        couple = Couple.objects.get(id=couple_id)
        if( couple.author.user.id == self.request.user.id):
            serializer.save(couple=couple)
        else:
            raise PermissionDenied(detail="You do not own this couple.")


class InCoupleDelete(generics.DestroyAPIView):
    serializer_class = IncoupleSerializer
    queryset = InCouple.objects.all()
    authentication_classes = (TokenAuthentication,)

    def perform_destroy(self, instance):

        if (not instance.author.user.id == self.request.user.id):
            raise PermissionDenied(detail="You do not own this couple.")
        else:
            instance.delete()

    def get_object(self):
        try:
            return InCouple.objects.get(pk= self.request.parser_context['kwargs']['pk'])
        except InCouple.DoesNotExist:
            raise Http404

# -----------------------------------------------------

from prediction_models import ingredient_rec_system
from prediction_models import recipe_region_classification
from rest_framework.views import APIView
class GetSubstitutes(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        ingredient = request.query_params['ingredient']
        n = request.query_params['amount']
        result = ingredient_rec_system.get_top_replacements(ingredient_name=ingredient, top_n=int(n))
        result_desc = OrderedDict(sorted(result.items(), key=lambda kv: kv[1], reverse=True))
        return Response(result_desc, status=200)


class GetRecommendations(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes(JSONParser,)

    def post(self, request, format=None):
        ingredients = request.data['ingredients']
        n = request.data['amount']
        if(len(ingredients) == 1):
            result = ingredient_rec_system.get_top_matches(ingredient_name=ingredients[0], top_n=int(n))
        else:
            result = ingredient_rec_system.get_top_recommendations_multiple(ingredient_names=ingredients, top_n=int(n))
            result = OrderedDict(sorted(result.items(), key=lambda kv: kv[1], reverse=True))
        return Response(result, status=200)

import pandas as pd

class ClassifyRegion(APIView):
    authentication_classes = (TokenAuthentication,)
    parser_classes(JSONParser,)

    def post(self, request, format=None):
        ingredients = request.data['ingredients']
        if len(ingredients) == 0:
            raise ValidationError('There should be at least one ingredient present to classify the region.')

        result = recipe_region_classification.classify_region(X=pd.DataFrame(ingredients))

        return Response(result, status=200)


