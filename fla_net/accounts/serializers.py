from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Account
from cookbook.models import Recipe, Couple


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['password', 'is_superuser', 'user_permissions', 'id']


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    recipe_count = serializers.SerializerMethodField()
    couple_count = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = '__all__'

    def get_recipe_count(self, account):
        return Recipe.objects.filter(author=account).count()

    def get_couple_count(self, account):
        return Couple.objects.filter(author=account).count()
