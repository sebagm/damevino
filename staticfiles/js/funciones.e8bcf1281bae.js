

function eslogan(){
    var titulo = document.title

    if(titulo == "DameVino" || titulo == "DameVino - Recomendador")
        document.write("Dinos qué comes y te diremos qué beber");
    
    if(titulo == "DameVino - Vinoteca")
        document.write("Encuentra tu vino preferido");

    if(titulo == "DameVino - Detalles")
        document.write("Detalles");

    if(titulo == "DameVino - Contacto")
        document.write("Contacto");
}

//=========================================FUNCIONES CONTACTO=========================================
//====================================================================================================

function enviar(){
    var nombre = document.getElementById("nom").value;
    var correo = document.getElementById("email").value;
    var msg = document.getElementById("mensaje").value;

    $("#group1 #advertencia").remove();
    $("#group2 #advertencia").remove();
    $("#group3 #advertencia").remove();

    if(nombre != ""){
        if(correo != ""){
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(regex.test(correo)){
                if(msg != ""){
                    $.get("../envioCorreo/", {"nombre": nombre, "correo": correo, "msg": msg}, function(){
                        $("#contenedor").empty();
                        var html = "";
                        var html2 = "";
                        html += "<div id='colC' class='row justify-content-center py-4' style='background-color: #a1ded6;'>"
                                    +"<div class='col-lg-8 col-xs-10'>"
                                        +"<h4 id='tituloC'>Tu mensaje ha sido enviado correctamente</h4"
                                    +"</div"
                                +"</div>"
                        
                        html2 += "<div class='row justify-content-center pt-3'>" 
                                    +"<a class='btn boton mt-4' href=\"/inicio/\" style='margin-right: 5px;'><b>DameVino</b></a>"
                                    +"<a class='btn boton mt-4' href=\"/contacto/\" style='margin-left: 5px'><b>Contacto</b></a>"
                                +"</div"

                        $("#contenedor").append(html);
                        $("#contenedor").append(html2);
                    });
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
    $("#colRV").empty();
    $("#colRV").append('<div id="cRV" class="col" align="center" style="overflow-y: auto; max-height: 350px;"></div>');
    $("#botonSiguiente").empty();
    $("#navMigajas").append("<ol id='migajas' class='breadcrumb'></ol>");
    tipoVino();
}

// Función que muestra las opciones a elegir de los tipos de vinos
function tipoVino(){
    tVino = new Array("Tinto", "Blanco", "Rosado", "Espumoso", "Generoso", "Dulce", );
    
    $("#tituloR").text("Tipo de vino");
    $("#cRV button").remove();
    $("#contenedorRVenviar input").remove();
    
    if(fin == false)
    {
        $("#migajas").append("<li class='breadcrumb-item pagAct'>1. Tipo de vino</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>2. Denominación</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>3. Edad</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>4. Maridaje</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagAct'>1. Tipo de vino</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }
    
    for(var i=0; i<tVino.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+ tVino[i] +"' onclick = tipoVvalue(this);>"+tVino[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoVvalue(this);><b>Saltar opción</b></button>");
}

// Función para obtener el value de la opción escogida por el usuario
function tipoVvalue(comp){
    tipoV = comp.value;

    if(fin == false)
        tipoDenominacion();
    else
        resumen();
}

function tipoDenominacion(){
    tDenominacion = new Array("Ribera del Duero", "Rioja", "Bierzo", "Toro", "Jerez-Xérès-Sherry", "Jumilla", "Somontano", "Terra Alta", "Corpinnat", "Catalunya", "Cava", "Málaga", "Rueda", "Campo De Borja", "Yecla", "Rías Baixas", "Empordà", "Penedés", "Ribeiro", "Calatayud", "Montilla-Moriles", "Navarra", "Madrid", "Alicante", "Bullas", "La Mancha", "Sierras de Málaga", "Priorat", "Lanzarote", "Montsant", "Almansa", "Manzanilla Sanlúcar de Barrameda", "VT Extremadura", "VT Castilla", "VT Cádiz", "VT EL Terrerazo", "VT Castilla y León");
    
    $("#tituloR").text("Denominación");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>2. Denominación</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>3. Edad</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>4. Maridaje</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>2. Denominación</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }

    for(var i=0; i<tDenominacion.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tDenominacion[i]+"' onclick = tipoDvalue(this);>"+tDenominacion[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoDvalue(this);><b>Saltar opción</b></button>");        
}

function tipoDvalue(comp){
    tipoD = comp.value;
    
    if(fin == false)
        tipoEdad();
    else
        resumen();
}

function tipoEdad(){
    tEdad = new Array("Joven", "Viejo");

    $("#tituloR").text("Edad del vino");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>3. Edad</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>4. Maridaje</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>3. Edad</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }

    for(var i=0; i<tEdad.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tEdad[i]+"' onclick = tipoEvalue(this);>"+tEdad[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoEvalue(this);>Saltar opción</button>");
}

function tipoEvalue(comp){
    tipoE = comp.value;
    
    if(fin == false)
        tipoMaridaje();
    else
        resumen();
}

function tipoMaridaje(){
    tMaridaje = new Array("Carne", "Ensalada", "Pescado", "Postres", "Pasta", "Queso", "Embutidos", "Platos de cuchara", "Verduras, legumbres y hortalizas", "Patatas", "Cocina española", "Cocina mediterránea", "Cocina vegetariana", "Cocina china", "Cocina italiana", "Cocina japonesa", "Cocina india", "Setas", "Frutas", "Arroz", "Aperitivos", "Marisco", "Platos Combinados", "Pate y foie", "Entrantes");

    $("#tituloR").text("¿Qué vas a comer?");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>4. Maridaje</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>4. Maridaje</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }

    for(var i=0; i<tMaridaje.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tMaridaje[i]+"' onclick = tipoMvalue(this);>"+tMaridaje[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoMvalue(this);>Saltar opción</button>");        
}

function tipoMvalue(comp){
    tipoM = comp.value;
    
    if(fin == false)
        tipoGusto();
    else
        resumen();
}

function tipoGusto(){
    tGusto = new Array("Afrutado", "Floral", "Vegetal", "Seco", "Semiseco", "Dulce");

    $("#tituloR").text("Sabor del vino");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>5. Sabor</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }

    for(var i=0; i<tGusto.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tGusto[i]+"' onclick = tipoGvalue(this);>"+tGusto[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoGvalue(this);>Saltar opción</button>");        
}

function tipoGvalue(comp){
    tipoG = comp.value;
    
    if(fin == false)
        tipoTextura();
    else
        resumen();
}

function tipoTextura(){
    tTextura = new Array("Suave", "Áspero", "Agrio", "Fresco", "Pesado", "Astringente", "Aterciopelado");

    $("#tituloR").text("Textura del vino");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>6. Textura</li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    }


    for(var i=0; i<tTextura.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tTextura[i]+"' onclick = tipoTvalue(this);>"+tTextura[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoTvalue(this);>Saltar opción</button>");
}

function tipoTvalue(comp){
    tipoT = comp.value;
    
    if(fin == false)
        tipoCuerpo();
    else
        resumen();
}

function tipoCuerpo(){
    tCuerpo = new Array("Ligero", "Medio", "Pleno");

    $("#tituloR").text("Cuerpo del vino");
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#contenedorRVenviar input").remove();

    if(fin == false)
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>7. Cuerpo</li>");
    }
    else
    {
        $("#migajas").empty();
        $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
        $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
        $("#migajas").append("<li class='breadcrumb-item pagAct'>7. Cuerpo</li>");
    }

    for(var i=0; i<tCuerpo.length; i++)
        $("#cRV").append("<button class='btn opcionesRV' value='"+tCuerpo[i]+"' onclick = tipoCvalue(this);>"+tCuerpo[i]+"</button>");

    $("#botonSiguiente").append("<button class='btn boton' value='Sin elección' onclick = tipoCvalue(this);>Saltar opción</button>");        
}

function tipoCvalue(comp){
    tipoC = comp.value;
    fin = true;
    resumen();
}

function resumen(){
    $("#cRV button").remove();
    $("#botonSiguiente button").remove();
    $("#tituloR").text("Características seleccionadas");
    
    $("#migajas").empty();
    $("#migajas").append("<li class='breadcrumb-item pagConf'>1. Tipo de vino&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>2. Denominación&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>3. Edad&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>4. Maridaje&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>5. Sabor&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>6. Textura&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagConf'>7. Cuerpo&nbsp;<i class='far fa-check-circle icono'></i></li>");
    $("#migajas").append("<li><i class='fas fa-angle-right mx-3'></i></li>");
    $("#migajas").append("<li class='breadcrumb-item pagAct'>Resumen</li>");
    
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoVino();>Tipo de vino: "+tipoV+"</button>");
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoDenominacion();>Denominación: "+tipoD+"</button>");
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoEdad();> Edad: "+tipoE+"</button>");
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoMaridaje();>Maridaje: "+tipoM+"</button>");
    $("#cRV").append("<button class='btn opcionesRV'  data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección'onclick = tipoGusto();>Sabor: "+tipoG+"</button>");
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoTextura();>Textura: "+tipoT+"</button>");
    $("#cRV").append("<button class='btn opcionesRV' data-toggle='tooltip' data-placement='top' title='Pincha para cambiar la elección' onclick = tipoCuerpo();>Cuerpo: "+tipoC+"</button>");
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

function borrarFiltro(){
    $("#divTipo input[type=checkbox]").each(function(){
        if(this.checked)
            this.checked = false;
    })

    $("#divDO input[type=checkbox]").each(function(){
        if(this.checked)
            this.checked = false
    })

    $("#divMaridaje input[type=checkbox]").each(function(){
        if(this.checked)
            this.checked = false
    })

    var fPuntuacion = $("#puntuacion").text();

    $.get("{% url 'filtroVinoteca' %}", {"fPuntuacion":fPuntuacion}, function(data){
        var html = "";
        var n = data.length;
        var vId;
        $("#cartas").empty();
        if (n > 0)
        {
            for(var i = 0; i<n; i++)
            {
                var vId = data[i].id;
                html+='<div class="card border-secondary mb-1">'
                        +'<div class="row no-gutters">'
                                +'<div class="col-xs-10 col-md-4">'
                                    +'<img src='+ data[i].img +' width="135" height="200" style="margin: 1em;" class="card-img" alt="...">'
                                +'</div>'
                                +'<div class="col-md-8">'    
                                    +'<div class="card-body">'
                                        +'<h5 class="card-title">'+ data[i].nombre +'</h5>'
                                        +'<p class="card-text" style="font-size: 1.2em;"><small class="text-muted">Tipo: '+ data[i].tipo +'</small></p>'
                                        +'<p class="card-text" style="font-size: 1.2em;"><small class="text-muted">D.O: '+ data[i].denominacion +'</small></p>'
                                        +'</br>'
                                        +'<a href="../detalles/'+vId+'" class="btn boton">Ver Detalles</a>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>';
            }
        }
        else
        {
            html+="<div><h2 class=\"text-center\"><span>No hay resultados</span></h2></div>";
        }
        $("#cartas").append(html);
    })
}