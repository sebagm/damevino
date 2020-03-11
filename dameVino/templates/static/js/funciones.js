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
                    $("#contenedor").append("<div class='col d-flex justify-content-center'><a class='btn boton mt-4' href=\"/inicio/\" style='margin-right: 5px; alig'><b>DameVino</b></a><a class='btn boton mt-4' href=\"/contacto/\" style='margin-left: 5px'><b>Contacto</b></a></div>")
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

var tVino = ["Tinto", "Blanco", "Rosado", "Espumoso", "Generoso", "Dulce"];

function tipoVino(){
    $("#contenedorRV").html("<div id='colRV' class='col d-flex justify-content-center'></div")
    $("#colRV").append

    for(var i=0; i<tVino.length; i++)
        $("#colRV").append("<a class='btn opcionesRV'>"+tVino[i]+"</a>");
}