from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def MinesweeperMain(request):
    template = loader.get_template('Main.html')
    return HttpResponse(template.render())

