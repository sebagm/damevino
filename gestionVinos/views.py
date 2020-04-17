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
    return render(request, "recomendador.html", {"rec":rec})


def vinoteca(request):
    vinos = Vinos.objects.all()

    return render(request, "vinoteca.html", {"vinos":vinos})

def detalles(request, idVino):
    v = Vinos.objects.get(id=idVino)
    return render(request, "detalles.html", {"v":v})

def contacto(request):
    return render(request, "contacto.html")

def envioCorreo(request):
    #Envío de correo
    return HttpResponse();

def formRecomendador(request):
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
    if tipo != "" and tipo != "Sin elección":
        cadena += tipo + " "
    
    denom = request.GET["tipoD"]
    if denom != "" and denom != "Sin elección":
        cadena += denom + " "

    edad = request.GET["tipoE"]
    if edad != "" and edad != "Sin elección":
        if tipo == "" or tipo == "Sin elección":
            if edad == "Joven":
                cadena += edad + ", " + cb.Joven + " "
            elif edad == "Viejo":
                cadena += edad + ", " + cb.Viejo + " "
        elif tipo == "Tinto" and edad == "Joven":
            cadena += edad + ", " + cb.JovenTinto + " "
        elif tipo == "Tinto" and edad == "Viejo":
            cadena += edad + ", " + cb.ViejoTinto + " "
        elif tipo == "Blanco" and edad == "Joven":
            cadena += edad + ", " + cb.JovenBlanco + " "
        elif tipo == "Blanco" and edad == "Viejo":
            cadena += edad + ", " + cb.ViejoBlanco + " "
        elif tipo == "Rosado" and edad == "Joven":
            cadena += edad + ", " + cb.JovenRosado + " "
        elif tipo == "Rosado" and edad == "Viejo":
            cadena += edad + ", " + cb.ViejoRosado + " "
        else:
            cadena += edad + " "

    maridaje = request.GET["tipoM"]
    if maridaje != "" and maridaje != "Sin elección":
        if maridaje == "Carne":
            cadena += maridaje + ", " + cb.Carne + " "
        elif maridaje == "Ensalada":
            cadena += maridaje + ", " + cb.Ensalada + " "
        elif maridaje == "Pescado":
            cadena += maridaje + ", " + cb.Pescado + " "
        elif maridaje == "Postres":
            cadena += maridaje + ", " + cb.Postres + " "
        elif maridaje == "Pasta":
            cadena += maridaje + ", " + cb.Pasta + " "
        elif maridaje == "Queso":
            cadena += maridaje + ", " + cb.Queso + " "
        elif maridaje == "Embutidos":
            cadena += maridaje + ", " + cb.Embutidos + " "
        elif maridaje == "Platos de cuchara":
            cadena += maridaje + ", " + cb.Platos_cuchara + " "
        elif maridaje == "Verduras, legumbres y hortalizas":
            cadena += maridaje + ", " + cb.Verduras_legumbres_hortalizas + " "
        elif maridaje == "Patatas":
            cadena += maridaje + ", " + cb.Patatas + " "
        elif maridaje == "Cocina española":
            cadena += maridaje + ", " + cb.Cocina_espanola + " "
        elif maridaje == "Cocina china":
            cadena += maridaje + ", " + cb.Cocina_china + " "
        elif maridaje == "Cocina italiana":
            cadena += maridaje + ", " + cb.Cocina_italiana + " "
        elif maridaje == "Cocina japonesa":
            cadena += maridaje + ", " + cb.Cocina_japonesa + " "
        elif maridaje == "Cocina india":
            cadena += maridaje + ", " + cb.Cocina_india + " "
        elif maridaje == "Setas":
            cadena += maridaje + ", " + cb.Setas + " "
        elif maridaje == "Arroz":
            cadena += maridaje + ", " + cb.Arroz + " "
        elif maridaje == "Aperitivos":
            cadena += maridaje + ", " + cb.Aperitivos + " "
        elif maridaje == "Marisco":
            cadena += maridaje + ", " + cb.Marisco + " "
        elif maridaje == "Platos Combinados":
            cadena += maridaje + ", " + cb.Platos_Combinados + " "
        elif maridaje == "Pate y foie":
            cadena += maridaje + ", " + cb.Pate_foie + " "

    gusto = request.GET["tipoG"]
    if gusto != "" and gusto != "Sin elección":
        if gusto == "Afrutado":
            cadena += gusto + ", " + cb.afrutado + " "
        elif gusto == "Floral":
            cadena += gusto + ", " + cb.floral + " "
        elif gusto == "Vegetal":
            cadena += gusto + ", " + cb.vegetal + " "

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
    """print(vino[0])
    print("ESTO QUE ES")
    print(vino[1].id)
    print(vino[1].nombre)
    print(vino[1].tipo)
    print(vino[1].denominacion)
    print(vino[1].img)"""
    return {'id':vino[1].id, 'nombre':vino[1].nombre, 'tipo':vino[1].tipo, 'denominacion':vino[1].denominacion, 'img':vino[1].img, 'url':vino[1].url}

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
    return {'id':vino.id, 'nombre':vino.nombre, 'tipo':vino.tipo, 'denominacion':vino.denominacion, 'img':vino.img, 'url':vino.url}