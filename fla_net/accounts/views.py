from rest_framework import generics
from rest_framework.decorators import renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account
from .serializers import AccountSerializer


@renderer_classes((JSONRenderer, ))
class AccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


@renderer_classes((JSONRenderer, ))
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer


    def get_queryset(self):
        return Account.objects.all()

class CurrentUserView(APIView):
    def get(self, request):
        account = Account.objects.get(user__id=request.user.id)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

# -----------------------------------------------------