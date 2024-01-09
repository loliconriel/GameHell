from django.contrib.auth import authenticate
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from .forms import MineForm
from .forms import LoginForm

# Create your views here.
def MinesweeperMain(request):
    template = loader.get_template('Main.html')

    return HttpResponse(template.render())
def login(request):
    template = loader.get_template("login.html")
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
        print(GameSetting)
        return render(request, "Gaming.html", {'select_form': select_form})
    else: return render(request, "Gaming.html", {'select_form': None})
def login(request):
    ''' 登入 '''
    login_page = loader.get_template('login.html')
    if request.method == 'GET':
        login_form = LoginForm()
        context = {
            'user': request.user,
            'login_form': login_form,
        }


        return HttpResponse(login_page.render(context, request))
    if request.method == "POST":
        
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.changed_data['username']
            password = login_form.changed_data['password']
            
            user = authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                main_page = loader.get_template('main.html')
                context = {'user': request.user,
                           'message': 'login ok'}
                return HttpResponse(login_page.render(context, request))
            else:
                message = 'Login failed (auth fail)'
        else:                    
            print ('Login error (login form is not valid)')
    else:
        print ('Error on request (not GET/POST)')
    context = {'user': request.user, 'login_form': login_form}
    return render(request, 'login.html', context)

def logout(request):
    ''' 登出 '''
    auth.logout(request)
    main_html = loader.get_template('Main.html')
    context = {'user': request.user}
    return HttpResponse(main_html.render(context, request))

def register(request):
    """Register a new user."""

    if request.method != 'POST':  
        print("ASd")
        form = UserCreationForm()

    else:
        
        form = UserCreationForm(data=request.POST)
        
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            
            authenticated_user = authenticate(username=username,
                password=password)
            user_obj = User.objects.filter(username=username)
            
            user = User.objects.create(username = username)
            user.set_password(password)
            user.save()
            # auth.login(request,authenticated_user)
            # main_page = loader.get_template('main.html')
            # context = {'user': request.user,
            #                'message': 'login ok'}
            return redirect('/')

    context = {'form': form}
    return render(request, 'register.html', context)