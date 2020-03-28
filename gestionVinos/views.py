from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from gestionVinos.models import Vinos
from django.core import serializers
from django.views.generic.list import ListView
import json
from django.db.models import Q

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
    t = request.GET['fDivTipo']
    print(t)
    tipo = t.split(', ')

    do = request.GET['fDivDO']
    dOrigen = do.split(', ')

    m = request.GET['fDivMaridaje']
    maridaje = m.split(', ')

    p = request.GET['fPuntuacion']

    query = "SELECT * FROM gestionVinos_vinos WHERE ("
    for tip in tipo:
        """ if tip == tipo[-1]:
            query += "tipo = '" + tip + "' "
        else: """
        query += "tipo = '" + tip + "' OR "
    
    for dorig in dOrigen:
        """ if dorig == dOrigen[-1]:
            query += "OR denominacion = '" + dorig + "' "
        else: """
        query += "denominacion = '" + dorig + "' OR "

    for marid in maridaje:
        if marid == maridaje[-1]:
            query += "maridaje = '" + marid + "' "
        else:
            query += "maridaje = '" + marid + "' OR "

    query += ") AND puntos <= " + p

    print(query)
    if query.__contains__("tipo = ''") and query.__contains__("denominacion = ''") and query.__contains__("maridaje = ''"):
        query = "SELECT * FROM gestionVinos_vinos WHERE puntos <= " + p
    print(query)
    """vinos = Vinos.objects.filter(Q(tipo=tipo[0]) | Q(tipo=tipo[1]))"""
    vinos = Vinos.objects.raw(query)
    vinos = [vino_serializer(vino) for vino in vinos]
    return HttpResponse(json.dumps(vinos), content_type='application/json')

def vino_serializer(vino):
    return {'id':vino.id, 'nombre':vino.nombre, 'tipo':vino.tipo, 'denominacion':vino.denominacion, 'img':vino.img}