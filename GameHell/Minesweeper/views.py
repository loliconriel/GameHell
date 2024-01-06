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
    select_form = MineForm()
    return render(request, 'GameSetting.html',{'select_form':select_form})
def Setting(request):
    template = loader.get_template('Setting.html')
    return HttpResponse(template.render())
def Gaming(request):
    template = loader.get_template('Gaming.html')
    print(request.method)
    if request.method =="POST":
        #GameSetting = request.POST.get('GameSetting')
        select_form = MineForm(request.POST)
        print("ASD")
        print(GameSetting)
        return render(request, "Gaming.html", {'select_form': select_form})
    else: return render(request, "Gaming.html", {'select_form': None})