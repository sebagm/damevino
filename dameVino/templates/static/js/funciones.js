

function eslogan(){
    var titulo = document.title

    if(titulo == "DameVino" || titulo == "DameVino - Recomendador" || titulo == "DameVino - Detalles")
        document.write("Dinos qué comes y te diremos qué beber");
    
        if(titulo == "DameVino - Vinoteca")
        document.write("Encuentra tu vino preferido");

    if(titulo == "DameVino - Contacto")
        document.write("Contacto");
}

//=========================================FUNCIONES CONTACTO=========================================
//====================================================================================================

function enviar(){
    var nombre = document.getElementById("nom").value;
    var correo = document.getElementById("email").value;
    var msg = document.getElementById("mensaje").value;

    $("#advertencia").remove();

    if(nombre != ""){
        if(correo != ""){
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(regex.test(correo)){
                if(msg != ""){
                    $("#contenedor").html("<p class='d-flex justify-content-center'><b>Tu mensaje ha sido enviado correctamente</b></p>")
                    $("#contenedor").append("<div class='col d-flex justify-content-center'><a class='btn boton mt-4' href=\"/inicio/\" style='margin-right: 5px;'><b>DameVino</b></a><a class='btn boton mt-4' href=\"/contacto/\" style='margin-left: 5px'><b>Contacto</b></a></div>")
                }
                else
                    $("#group3").append("<p id='advertencia' style='color: #762933'><b>Este campo no puede estar vacío</b></p>")
            }
            else
            $("#group2").append("<p id='advertencia' style='color: #762933'><b>El correo no tiene una estructura válida</b></p>")
        }
        else
            $("#group2").append("<p id='advertencia' style='color: #762933'><b>Este campo no puede estar vacío</b></p>")    
    }    
    else        
        $("#group1").append("<p id='advertencia' style='color: #762933'><b>Este campo no puede estar vacío</b></p>")
}

//=========================================FUNCIONES RECOMENDADOR=========================================
//========================================================================================================

// Variables globales que contendrán las opciones escogidas por el usuario
var tipoV, tipoD, tipoE, tipoM, tipoG, tipoT, tipoC, fin;

// Función  que inicia el formulario dinámico
function inicioRecomendador(){
    fin = false;
    tipoVino();
}

// Función que muestra las opciones a elegir de los tipos de vinos
function tipoVino(){
    tVino = new Array("Tinto", "Blanco", "Rosado", "Espumoso", "Generoso", "Dulce");
    
    $("#tituloR").text("Tipo de vino");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tVino.length; i++)
        $("#colRV").append("<button id='"+tVino[i]+"' class='btn opcionesRV' onclick = tipoVid(this);>"+tVino[i]+"</button>");
}

// Función para obtener el id de la opción escogida por el usuario
function tipoVid(comp){
    tipoV = comp.id;

    if(fin == false)
        tipoDenominacion();
    else
        resumen();
}

function tipoDenominacion(){
    tDenominacion = new Array("La Rioja", "Ribera del Duero", "Somontano", "Toro", "Manchuela", "Rueda", "Jerez-Xérès-Sherry", "Rías Baixas", "Calatayud", "Corpinnat", "Bierzo", "Campo de Borja", "Yecla", "Montsant", "Empordá", "Montilla-Moriles", "Priorat", "Tres Riberas", "Ribeira Sacra", "Cava", "Alicante", "Jumilla", "Madrid", "Navarra", "Valencia", "Sierras de Málaga", "Manzanilla Sanlúcar de Barrameda", "VT Cádiz", "VT Castilla y León", "VT El Terrerazo", "VT Extremadura", "VT Mallorca");
    
    $("#tituloR").text("Denominación");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tDenominacion.length; i++)
        $("#colRV").append("<button id='"+tDenominacion[i]+"' class='btn opcionesRV' onclick = tipoDid(this);>"+tDenominacion[i]+"</button>");
}

function tipoDid(comp){
    tipoD = comp.id;
    
    if(fin == false)
        tipoEdad();
    else
        resumen();
}

function tipoEdad(){
    tEdad = new Array("Joven", "Viejo");

    $("#tituloR").text("Edad del vino");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tEdad.length; i++)
        $("#colRV").append("<button id='"+tEdad[i]+"' class='btn opcionesRV' onclick = tipoEid(this);>"+tEdad[i]+"</button>");
}

function tipoEid(comp){
    tipoE = comp.id;
    
    if(fin == false)
        tipoMaridaje();
    else
        resumen();
}

function tipoMaridaje(){
    tMaridaje = new Array("Carne", "Ensalada", "Pescado", "Postres", "Pasta", "Queso", "Embutidos", "Platos de cuchara", "Verduras, legumbres y hortalizas", "Patatas", "Cocina española", "Cocina mediterránea", "Cocina vegetariana", "Cocina china", "Cocina italiana", "Cocina japonesa", "Cocina india", "Setas", "Frutas", "Arroz", "Aperitivos", "Marisco", "Huevos", "Platos combinados", "Tapas");

    $("#tituloR").text("¿Qué vas a comer?");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tMaridaje.length; i++)
        $("#colRV").append("<button id='"+tMaridaje[i]+"' class='btn opcionesRV' onclick = tipoMid(this);>"+tMaridaje[i]+"</button>");
}

function tipoMid(comp){
    tipoM = comp.id;
    
    if(fin == false)
        tipoGusto();
    else
        resumen();
}

function tipoGusto(){
    tGusto = new Array("Afrutado", "Floral", "Vegetal", "Seco", "Semiseco", "Dulce");

    $("#tituloR").text("Sabor del vino");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tGusto.length; i++)
        $("#colRV").append("<button id='"+tGusto[i]+"' class='btn opcionesRV' onclick = tipoGid(this);>"+tGusto[i]+"</button>");
}

function tipoGid(comp){
    tipoG = comp.id;
    
    if(fin == false)
        tipoTextura();
    else
        resumen();
}

function tipoTextura(){
    tTextura = new Array("Suave", "Áspero", "Agrio", "Fresco", "Pesado", "Astringente", "Aterciopelado");

    $("#tituloR").text("Textura del vino");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tTextura.length; i++)
        $("#colRV").append("<button id='"+tTextura[i]+"' class='btn opcionesRV' onclick = tipoTid(this);>"+tTextura[i]+"</button>");
}

function tipoTid(comp){
    tipoT = comp.id;
    
    if(fin == false)
        tipoCuerpo();
    else
        resumen();
}

function tipoCuerpo(){
    tCuerpo = new Array("Ligero", "Medio", "Pleno");

    $("#tituloR").text("Cuerpo del vino");
    $("#colRV button").remove();
    $("#contenedorRVenviar input").remove();

    for(var i=0; i<tCuerpo.length; i++)
        $("#colRV").append("<button id='"+tCuerpo[i]+"' class='btn opcionesRV' onclick = tipoCid(this);>"+tCuerpo[i]+"</button>");
}

function tipoCid(comp){
    tipoC = comp.id;
    fin = true;
    resumen();
}

function resumen(){
    $("#colRV button").remove();
    $("#tituloR").text("Características seleccionadas");
    
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoVino();>Tipo de vino: "+tipoV+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoDenominacion();>Denominación: "+tipoD+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoEdad();> Edad: "+tipoE+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoMaridaje();>Maridaje: "+tipoM+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoGusto();>Sabor: "+tipoG+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoTextura();>Textura: "+tipoT+"</button>");
    $("#colRV").append("<button class='btn opcionesRV' onclick = tipoCuerpo();>Cuerpo: "+tipoC+"</button>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Vino' value='"+tipoV+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Denom' value='"+tipoD+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Edad' value='"+tipoE+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Marid' value='"+tipoM+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Gusto' value='"+tipoG+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Textura' value='"+tipoT+"'>");
    $("#contenedorRVenviar form").append("<input type='hidden' name='Cuerpo' value='"+tipoC+"'>");
    $("#contenedorRVenviar form").append("<input type='submit' class='btn boton' value='Recomendar'>")
}

//=========================================FUNCIONES VINOTECA=========================================
//====================================================================================================

function checa(tintos)
{
    var checkBox = document.getElementById("estoEsTinto");
    if(checkBox.checked == true)
    {
        $("#grupoVinos div").remove();
        //vinos = Vinos.objects.filter(tipo__icontains="Vino tinto");
/*         cadena = '<div class="card mb-3 results" style="max-width: 540px;">'+
                    '{% if "tintos" %}'+
                        '{% for vino in "tintos" %}'+
                            '<div class="row no-gutters">'+
                                '<div class="col-md-4">'+
                                    '<img src={{vino.img}} width="200" height="200" style="margin: 1em;" class="card-img" alt="...">'+
                                '</div>'+
                                '<div class="col-md-8">'+
                                    '<div class="card-body">'+
                                        '<h5 class="card-title">{{vino.nombre}}</h5>'+
                                        '<p class="card-text">Tipo: {{vino.tipo}}</p>'+
                                        '<p class="card-text"><small class="text-muted">D.O: {{vino.denominacion}}</small></p>'+
                                        '<br/>'+
                                        '<input type="button" value="Ver vino"/>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '{% endfor %}'+
                    '{% endif %}'+
                '</div>';

        $("#grupoVinos").html(cadena); */
    }
}