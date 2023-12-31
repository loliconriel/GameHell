from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .forms import MineForm
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
    return render(request, 'Setting.html')
def Gaming(request):
    template = loader.get_template('Gaming.html')
    print(request.method)
    if request.method =="POST":
        #GameSetting = request.POST.get('GameSetting')
        GameSetting = MineForm(request.POST)
        print("ASD")
        print(GameSetting)
        return render(request, "Gaming.html", {'GameSetting': GameSetting})
    else: return render(request, "Gaming.html", {'GameSetting': None})