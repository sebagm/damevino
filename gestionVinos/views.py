from django.shortcuts import render
from django.http import HttpResponse
from gestionVinos.models import Vinos

# Create your views here.

def inicio(request):
    return render(request, "inicio.html")

def recomendador(request):
    rec = False
    return render(request, "recomendador.html", {"rec":rec})

def vinoteca(request):

    vinos = Vinos.objects.all()

    return render(request, "vinoteca.html", {"vinos":vinos})

def detalles(request):
    return render(request, "detalles.html")

def contacto(request):
    return render(request, "contacto.html")

def formRecomendador(request):
    rec = True
    tV = request.GET["Vino"]
    return render(request, "recomendador.html", {"rec":rec, "vino":tV})