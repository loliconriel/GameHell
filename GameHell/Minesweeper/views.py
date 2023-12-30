from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def MinesweeperMain(request):
    template = loader.get_template('Main.html')
    
    return HttpResponse(template.render())
def login(request):
    template = loader.get_template("Login.html")
    return HttpResponse(template.render())
def GameSetting(request):
    template = loader.get_template('GameSetting.html')
    #if request.method == 'GET':
        #print('HI')
        
        #PrepareForm = MineForm()
    return HttpResponse(template.render())
def Setting(request):
    template = loader.get_template('Setting.html')
    return HttpResponse(template.render())
def Gaming(request):
    template = loader.get_template('Gaming.html')
    return HttpResponse(template.render())