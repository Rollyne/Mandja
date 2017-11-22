from django.conf.urls import url
from . import views
from rest_framework.authtoken import views as authtoken_views


urlpatterns = [
    url(r'^accounts/(?P<pk>[0-9]+)/$', views.AccountDetail.as_view(), name='account-detail'),
    url(r'^accounts/$', views.AccountList.as_view(), name='account-list'),
    url(r'^accounts/login/$', authtoken_views.obtain_auth_token, name='account-login'),
    url(r'^accounts/me/$', views.CurrentUserView.as_view(), name='account-me'),
    url(r'^accounts/signup/$', views.CreateAccount.as_view(), name='account-signup'),
]