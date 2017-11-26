from django.conf.urls import url

from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    url(r'^cookbook/$', views.RecipeManageView.as_view(), name='recipe-list'),
    url(r'^cookbook/(?P<pk>[0-9]+)/$', views.RecipeDetail.as_view(), name='recipe-detail'),

    url(r'^cookbook/(?P<pk>[0-9]+)/comments/$', views.CommentList.as_view(), name='comment-list'),
    url(r'^cookbook/comments/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name='comment-detail'),

    url(r'^cookbook/(?P<pk>[0-9]+)/ingredients/$', views.InrecipeList.as_view(), name='recipe-ingredient-list'),

    url(r'^cookbook/ingredients/$', views.IngredientList.as_view(), name='ingredient-list'),
    url(r'^cookbook/ingredients/(?P<pk>[0-9]+)/$', views.IngredientDetail.as_view(), name='ingredient-detail'),

    url(r'^cookbook/substitutes/$', views.GetSubstitutes.as_view(), name='substitutes-list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
