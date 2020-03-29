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
    
    query = "SELECT * FROM gestionVinos_vinos WHERE ("
    
    t = request.GET['fDivTipo']
    if t != "":
        tipo = t.split(', ')
        nT = len(tipo)
        for tip in range(nT-1):
            query += "tipo = '" + tipo[tip] + "'"
            if tip < nT-2:
                query += " OR "
        query += ") AND ("

    do = request.GET['fDivDO']
    if do != "":
        dOrigen = do.split(', ')
        ndO = len(dOrigen)
        for dorig in range(ndO-1):
            query += "denominacion = '" + dOrigen[dorig] + "'"
            if dorig < ndO-2:
                query += " OR "
        query += ") AND ("

    m = request.GET['fDivMaridaje']
    if m != "":
        maridaje = m.split(', ')
        nMaridaje = len(maridaje)
        for marid in range(nMaridaje-1):
            query += "maridaje LIKE '%" + maridaje[marid] + "%'"
            if marid < nMaridaje-2:
                query += " OR "
        query += ") AND ("

    p = request.GET['fPuntuacion']
    query += "puntos <= " + p + ")"

    print(query)
    
    vinos = Vinos.objects.raw(query)
    vinos = [vino_serializer(vino) for vino in vinos]
    return HttpResponse(json.dumps(vinos), content_type='application/json')

def vino_serializer(vino):
    return {'id':vino.id, 'nombre':vino.nombre, 'tipo':vino.tipo, 'denominacion':vino.denominacion, 'img':vino.img}