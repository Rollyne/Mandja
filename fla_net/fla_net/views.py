import logging
import os

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings


# class WebAppView(View):
#     """
#     Serves the compiled frontend entry point (only works if you have run `yarn
#     run build`).
#     """
#
#     def get(self, request):
#         try:
#             with open(os.path.join(settings.REACT_APP_DIR, 'build_v1', 'index.html')) as f:
#                 return HttpResponse(f.read())
#         except FileNotFoundError:
#             logging.exception('Production build of app not found')
#             return HttpResponse(
#                 """
#                 This URL is only used when you have built the production
#                 version of the app. Visit http://localhost:3000/ instead, or
#                 run `yarn run build` to test the production version.
#                 """,
#                 status=501,
#            )
from rest_framework.response import Response
from rest_framework.views import APIView
#

class BaseManageView(APIView):
    """
    The base class for ManageViews
        A ManageView is a view which is used to dispatch the requests to the appropriate views
        This is done so that we can use one URL with different methods (GET, PUT, etc)
    """
    def dispatch(self, request, *args, **kwargs):
        if not hasattr(self, 'VIEWS_BY_METHOD'):
            raise Exception('VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
        if request.method in self.VIEWS_BY_METHOD:
            return self.VIEWS_BY_METHOD[request.method]()(request, *args, **kwargs)

        return Response(status=405)
