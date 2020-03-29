from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from gestionVinos.models import Vinos
from django.core import serializers
from django.views.generic.list import ListView
import json
import gestionVinos.ContendBased as CB
import pandas as pd
import sqlite3

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

    conn = sqlite3.connect("db.sqlite3")
    datos = pd.read_sql_query("SELECT * FROM gestionVinos_vinos;", conn)

    prediccion = []
    for index, row in datos.iterrows():
        cadena = row['tipo'] + "; " + row['denominacion'] + "; " + row['maridaje'] + "; " + row['vista'] + "; " + row['nariz'] + "; " + row['boca']
        prediccion.insert(index, cadena)
    datos['prediccion'] = prediccion

    cb = CB.ContentBased()
    cb.fit(datos,columna_descripcion='prediccion')
    
    cadena = ""

    tipo = request.GET["tipoV"]
    if tipo != "":
        cadena += tipo + " "
    
    denom = request.GET["tipoD"]
    if denom != "" and denom != "Sin elección":
        cadena += denom + " "

    edad = request.GET["tipoE"]
    if edad != "" and edad != "Sin elección":
        cadena += edad + " "

    maridaje = request.GET["tipoM"]
    if maridaje != "" and maridaje != "Sin elección":
        cadena += maridaje + " "

    gusto = request.GET["tipoG"]
    if gusto != "" and gusto != "Sin elección":
        cadena += gusto + " "

    textura = request.GET["tipoT"]
    if textura != "" and textura != "Sin elección":
        cadena += textura + " "

    cuerpo = request.GET["tipoC"]
    if cuerpo != "" and cuerpo != "Sin elección":
        cadena += cuerpo

    print(cadena)
    vinos_pd = cb.predict([cadena])
    del vinos_pd['prediccion']

    vinos = [vino_serializer2(vino) for vino in vinos_pd.iterrows()]
    return HttpResponse(json.dumps(vinos), content_type='application/json')

def vino_serializer2(vino):
    print(vino[0])
    print("ESTO QUE ES")
    print(vino[1].id)
    print(vino[1].nombre)
    print(vino[1].tipo)
    print(vino[1].denominacion)
    print(vino[1].img)
    return {'id':vino[1].id, 'nombre':vino[1].nombre, 'tipo':vino[1].tipo, 'denominacion':vino[1].denominacion, 'img':vino[1].img}

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