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

function eslogan(){
    var titulo = document.title

    if(titulo == "DameVino" || titulo == "DameVino - Recomendador" || titulo == "DameVino - Detalles")
        document.write("Dinos qué comes y te diremos qué beber");
    
        if(titulo == "DameVino - Vinoteca")
        document.write("Encuentra tu vino preferido");

    if(titulo == "DameVino - Contacto")
        document.write("Contacto");
}

// Variables globalles que contendrán las opciones escogidas por el usuario
var tipoV, tipoD, tipoE, tipoM, tipoG, tipoT, tipoC;

// Función  que inicia el formulario dinámico
function inicioRecomendador(){
    $("#contenedorRV").html("<div id='colRV' class='col d-flex justify-content-center'></div");
    tipoVino();
}

// Función que muestra las opciones a elegir de los tipos de vinos
function tipoVino(){
    tVino = new Array("Tinto", "Blanco", "Rosado", "Espumoso", "Generoso", "Dulce");
    
    for(var i=0; i<tVino.length; i++)
        $("#colRV").append("<button id='"+tVino[i]+"' class='btn opcionesRV' onclick = tipoVid(this);>"+tVino[i]+"</button>");
}

// Función para obtener el id de la opción escogida por el usuario
function tipoVid(comp){
    tipoV = "Tipo de vino: " + comp.id;
    document.getElementById('c1').innerHTML = tipoV;
    tipoDenominacion();
}

function tipoDenominacion(){
    tDenominacion = new Array("La Rioja", "Ribera del Duero", "Somontano", "Toro", "Manchuela", "Rueda", "Jerez-Xérès-Sherry", "Rías Baixas", "Calatayud", "Corpinnat", "Bierzo", "Campo de Borja", "Yecla", "Montsant", "Empordá", "Montilla-Moriles", "Priorat", "Tres Riberas", "Ribeira Sacra", "Cava", "Alicante", "Jumilla", "Madrid", "Navarra", "Valencia", "Sierras de Málaga", "Manzanilla Sanlúcar de Barrameda", "VT Cádiz", "VT Castilla y León", "VT El Terrerazo", "VT Extremadura", "VT Mallorca");
    
    $("#colRV button").remove();

    for(var i=0; i<tDenominacion.length; i++)
        $("#colRV").append("<button id='"+tDenominacion[i]+"' class='btn opcionesRV' onclick = tipoDid(this);>"+tDenominacion[i]+"</button>");
}

function tipoDid(comp){
    tipoD = "Denominación: " + comp.id;
    document.getElementById('c2').innerHTML = tipoD;
    tipoEdad();
}

function tipoEdad(){
    tEdad = new Array("Joven", "Viejo");

    $("#colRV button").remove();

    for(var i=0; i<tEdad.length; i++)
        $("#colRV").append("<button id='"+tEdad[i]+"' class='btn opcionesRV' onclick = tipoEid(this);>"+tEdad[i]+"</button>");
}

function tipoEid(comp){
    tipoE = "Edad: " + comp.id;
    document.getElementById('c3').innerHTML = tipoE;
    tipoMaridaje();
}

function tipoMaridaje(){
    tMaridaje = new Array("Carne", "Ensalada", "Pescado", "Postres", "Pasta", "Queso", "Embutidos", "Platos de cuchara", "Verduras, legumbres y hortalizas", "Patatas", "Cocina española", "Cocina mediterránea", "Cocina vegetariana", "Cocina china", "Cocina italiana", "Cocina japonesa", "Cocina india", "Setas", "Frutas", "Arroz", "Aperitivos", "Marisco", "Huevos", "Platos combinados", "Tapas");

    $("#colRV button").remove();

    for(var i=0; i<tMaridaje.length; i++)
        $("#colRV").append("<button id='"+tMaridaje[i]+"' class='btn opcionesRV' onclick = tipoMid(this);>"+tMaridaje[i]+"</button>");
}

function tipoMid(comp){
    tipoM = "Maridaje: " + comp.id;
    document.getElementById('c4').innerHTML = tipoM;
    tipoGusto();
}

function tipoGusto(){
    tGusto = new Array("Afrutado", "Floral", "Vegetal", "Seco", "Semiseco", "Dulce");

    $("#colRV button").remove();

    for(var i=0; i<tGusto.length; i++)
        $("#colRV").append("<button id='"+tGusto[i]+"' class='btn opcionesRV' onclick = tipoGid(this);>"+tGusto[i]+"</button>");
}

function tipoGid(comp){
    tipoG = "Gusto: " + comp.id;
    document.getElementById('c5').innerHTML = tipoG;
    tipoTextura();
}

function tipoTextura(){
    tTextura = new Array("Suave", "Áspero", "Agrio", "Fresco", "Pesado", "Astringente", "Aterciopelado");

    $("#colRV button").remove();

    for(var i=0; i<tTextura.length; i++)
        $("#colRV").append("<button id='"+tTextura[i]+"' class='btn opcionesRV' onclick = tipoTid(this);>"+tTextura[i]+"</button>");
}

function tipoTid(comp){
    tipoT = "Textura: " + comp.id;
    document.getElementById('c6').innerHTML = tipoT;
    tipoCuerpo();
}

function tipoCuerpo(){
    tCuerpo = new Array("Ligero", "Medio", "Pleno");

    $("#colRV button").remove();

    for(var i=0; i<tCuerpo.length; i++)
        $("#colRV").append("<button id='"+tCuerpo[i]+"' class='btn opcionesRV' onclick = tipoCid(this);>"+tCuerpo[i]+"</button>");
}

function tipoCid(comp){
    tipoC = "Cuerpo: " + comp.id;
    document.getElementById('c7').innerHTML = tipoC;
    fin();
}

function fin(){
    $("#colRV button").remove();
    $("#colRV").append("<h1>Se acabó el formulario</h1>");
}

//=========================================FUNCIONES VINOTECA=========================
//================================================================================

