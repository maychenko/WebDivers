from django.shortcuts import render

def home_page(request):
    return render(request, 'main/home.html')

def armory(request):
    return render(request, 'main/armory.html')