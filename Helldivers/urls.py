from django.contrib import admin
from django.urls import path
from Helldivers import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_page, name='home'),
    path('armory/', views.armory, name='armory'),
    path('stratagems/', views.stratagems, name='stratagems'),
]