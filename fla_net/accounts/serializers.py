from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Account


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['password', 'is_superuser', 'user_permissions', 'id']


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Account
        fields = '__all__'

