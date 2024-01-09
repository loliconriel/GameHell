from django.contrib.auth import authenticate
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import MineForm
from .forms import LoginForm
from .models import Difficulty
from.models import LeaderBoard

# Create your views here.
def MinesweeperMain(request):
    template = loader.get_template('Main.html')
    if request.user.is_authenticated:
        context = {'user': request.user}
        return HttpResponse(template.render(context,request))
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

    if request.method =="POST":
        #GameSetting = request.POST.get('GameSetting')
        select_form = MineForm(request.POST)
        print(select_form)
        return render(request, "Gaming.html", {'select_form': select_form})
    else: return render(request, "Gaming.html")
def LeaderBoardhtml(request):
    template = loader.get_template('Leaderboard.html')

    return render(request,'Leaderboard.html')
@csrf_exempt  # Disable CSRF protection for this view (for simplicity in this example, make sure to handle CSRF properly in production)
def save_result(request):
    print(request)
    print("DYTUGIOJO:")
    if request.method == 'POST':
        player_name = request.POST.get('player_name')
        score = request.POST.get('score')
        difficulty = request.POST.get('difficulty')
        try:
            difficulty_instance = Difficulty.objects.get(Difficultyvalue=difficulty)
            LeaderBoard.objects.create(player_name=player_name, score=score, difficulty=difficulty_instance)
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})
def login(request):
    ''' 登入 '''
    if request.user.is_authenticated:
        return HttpResponseRedirect('/Minesweeper')
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        auth.login(request, user)
        return HttpResponseRedirect('/Minesweeper')
    else:
        return render(request, 'login.html', locals())

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
            form.save()
            # username = request.POST.get('username')
            # password = request.POST.get('password')
            
            # authenticated_user = authenticate(username=username,
            #     password=password)
            # user_obj = User.objects.filter(username=username)
            
            # user = User.objects.create(username = username)
            # user.set_password(password)
            # user.save()
            # auth.login(request,authenticated_user)
            # main_page = loader.get_template('main.html')
            # context = {'user': request.user,
            #                'message': 'login ok'}
            return redirect('/Minesweeper/')

    context = {'form': form}
    return render(request, 'register.html', context)