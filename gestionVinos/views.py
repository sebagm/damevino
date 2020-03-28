from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from gestionVinos.models import Vinos
from django.core import serializers
from django.views.generic.list import ListView
import json

# Create your views here.

def inicio(request):
    return render(request, "inicio.html")

def recomendador(request):
    rec = False
    return render(request, "recomendador.html", {"rec":rec})


def vinoteca(request):

    vinos = Vinos.objects.all()

    return render(request, "vinoteca.html", {"vinos":vinos})

def detalles(request, idVino):
    v = Vinos.objects.get(id=idVino)
    return render(request, "detalles.html", {"v":v})

def contacto(request):
    return render(request, "contacto.html")

def formRecomendador(request):
    rec = True
    if request.GET["Vino"] == "Sin elección":
        tV = "No se ha elegido tipo de vino"
    else:   
        tV = request.GET["Vino"]
    return render(request, "recomendador.html", {"rec":rec, "vino":tV})

def filtroVinoteca(request):
    t = request.GET['fD']
    tipo = t.split(', ')
    print(tipo[0])
    print(tipo[1])
    vinos = Vinos.objects.filter(tipo=tipo[0] and tipo[1])
    vinos = [vino_serializer(vino) for vino in vinos]
    return HttpResponse(json.dumps(vinos), content_type='application/json')

def vino_serializer(vino):
    return {'id':vino.id, 'nombre':vino.nombre, 'tipo':vino.tipo, 'denominacion':vino.denominacion, 'img':vino.img}