from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^cookbook/$', views.RecipeList.as_view(), name='recipe-list'),
    url(r'^cookbook/(?P<pk>[0-9]+)/$', views.RecipeDetail.as_view(), name='recipe-detail'),

    url(r'^accounts/(?P<pk>[0-9]+)/$', views.AccountDetail.as_view(), name='account-detail'),
    url(r'^accounts/$', views.AccountList.as_view(), name='account-list'),

    url(r'^cookbook/(?P<pk>[0-9]+)/comments/$', views.CommentList.as_view(), name='comment-list'),
    url(r'^cookbook/comments/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name='comment-detail'),

    url(r'^cookbook/(?P<pk>[0-9]+)/ingredients/$', views.InrecipeList.as_view(), name='recipe-ingredient-list'),

    url(r'^cookbook/ingredients/$', views.IngredientList.as_view(), name='ingredient-list'),
    url(r'^cookbook/ingredients/(?P<pk>[0-9]+)/$', views.IngredientDetail.as_view(), name='ingredient-detail'),
]