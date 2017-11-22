from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import renderer_classes, api_view, authentication_classes, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account
from .serializers import AccountSerializer, UserSerializer


@renderer_classes((JSONRenderer, ))
class AccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


@renderer_classes((JSONRenderer, ))
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer


    def get_queryset(self):
        return Account.objects.all()


@renderer_classes((JSONRenderer, ))
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated, ))
class CurrentUserView(APIView):
    def get(self, request):
        account = Account.objects.get(user__id=request.user.id)
        serializer = AccountSerializer(account)
        return Response(serializer.data)


@renderer_classes((JSONRenderer, ))
class CreateAccount(APIView):

    def post(self, request):

        user_serializer = UserSerializer(data=request.data['user'])
        account_serializer = AccountSerializer(data=request.data['account'])
        a_is_valid = account_serializer.is_valid()
        is_valid = user_serializer.is_valid() and a_is_valid

        if(is_valid):
            user_serializer.save()
            instance = user_serializer.instance
            instance.set_password(request.data['user']['password'])
            user_serializer.save()
            account_serializer.validated_data['user'] = user_serializer.instance
            account_serializer.save()
            return Response({'message': 'Success!'}, status=200)

        else:
            return Response({**account_serializer.errors, **user_serializer.errors})


# -----------------------------------------------------