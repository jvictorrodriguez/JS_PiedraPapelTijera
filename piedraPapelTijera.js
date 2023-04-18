// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//    //
var comentarios=false;

// B O T O N E S
//Asignar variables
var botonJugar=document.getElementsByTagName("button")[0];
var botonYa=document.getElementsByTagName("button")[1];
var botonReset=document.getElementsByTagName("button")[2];

//OTRAS VARIABLES
var eleccionJugador;
var contador;
var partidasTotales;

//Asignar listeners
botonJugar.addEventListener("click",jugar);
botonYa.addEventListener("click",ya);
botonReset.addEventListener("click",reset);


//Inicia el programa
reset();


//Imágenes Jugador1         //Llama a la función generaImagen
let imagenes= document.getElementsByTagName("img");
for (let i=0;i<posibilidades.length;i++){
    imagenes[i].src=generaImagen(i,"Jugador");
    if (comentarios) console.log(imagenes[i]);
}


//Selección de icono Jugador1
for(let i=0; i<posibilidades.length; i++){
    imagenes[i].onclick = function(){       
        //Inicializamos los estados de las imagenes
        resetSeleccionImagen(imagenes);
        //Marcamos la seleccionada
        imagenes[i].classList.add("seleccionado");
        imagenes[i].classList.remove("noSeleccionado");
        //Guarda la variable eleccionJugador 
        eleccionJugador= i;
        //Muestra por consola los valores seleccionados
        if (comentarios) console.log("Elección jugador "+ i + posibilidades[i]);
    }
}

//Crear una función que me de la imagen
//Le pasaré un valor de posición del array sin es menor a length será del player1 sino de la máquina y me devolvera el html de la imagen
function generaImagen(opcion,player){
        if (opcion>posibilidades.length) {
            return "img/defecto.png"
        }
        imagen = "img/"+ posibilidades[opcion]+ player+ ".png";
        if (comentarios) console.log("Proviene de función generarImagen " +  imagen);
    return imagen;
}

//Devuelve la imagen generada aleatoriamente del Ordenador
function seleccionMaquina(){
    //Selección Máquina      
        let eleccionMaquina = Math.floor(Math.random() * posibilidades.length)
        imagenes[posibilidades.length].src=generaImagen(eleccionMaquina,"Ordenador");
    return eleccionMaquina;
}


// F U N C I O N E S    B O T O N E S 
function jugar(){
    if (comentarios)console.log("Entraste en la función jugar");
    let nombres = document.getElementsByName("nombre");     //En plural pq es un array
    let partidas = document.getElementsByName("partidas");  //En plural pq es un array
    //Si ambos valores son correctos deshabilita los 2 campos y el botón jugar
    if ( comprobarNombre(nombres[0]) && comprobarNumPartidas(partidas[0])) {
        if (comentarios) console.log("Ambos valores son correctos");
        nombres[0].disabled=true;
        partidas[0].disabled=true;
        botonJugar.disabled=true;
        botonYa.disabled=false;
        contador=1;
        partidasTotales=partidas[0].value;
        controlPartidas();
    }
}

function ya(){
    //variables locales
    let nombres = document.getElementsByName("nombre");     //En plural pq es un array
    let eleccionMaquina=seleccionMaquina();
    var ganador= comprobarGanador(eleccionJugador,eleccionMaquina,nombres[0].value);
    historial(ganador);
    contador++;
    controlPartidas();
}

function reset(){
    if (comentarios) console.log("Entraste en la función reset"); 
    //Creamos nuevas variables locales
    let nombres = document.getElementsByName("nombre");     //En plural pq es un array
    let partidas = document.getElementsByName("partidas");  //En plural pq es un array
    let imagenes = document.getElementsByTagName("img");
    //Reiniciamos las variables
    nombres[0].focus();
    nombres[0].disabled=false;
    partidas[0].disabled=false;
    contador=0;
    partidasTotales=0;
    actual.innerHTML=contador;
    total.innerHTML=partidasTotales;
    botonJugar.disabled=false;
    botonYa.disabled=true;
    eleccionJugador=0;
    historial("Nueva Partida");
    resetSeleccionImagen; //todo
    imagenes[posibilidades.length].src= generaImagen(posibilidades.length+1,"Ordenador");

}

// O T R A S   F U N C I O N E S
function seAcaboLaPartida(){
    //Bloqueamos el juego
    console.log("Se acabó la partida");
    botonYa.disabled=true;    

}
function resetSeleccionImagen(imagenes){
    for(let i=0; i<posibilidades.length; i++){
        imagenes[i].classList.remove("seleccionado");
        imagenes[i].classList.add("noSeleccionado");
    } 
}

function controlPartidas(){
    //Asignamos variables a los span de número de partidas
    let actual = document.getElementById("actual");
    let total = document.getElementById("total");
   if (contador>partidasTotales)    {
       seAcaboLaPartida();
       return;
   }    
    //Asignamos valores a los span
    actual.innerHTML=contador;
    total.innerHTML=partidasTotales;
}


//Función que comprobará a calidad del nombre
//Comprobará que la longitud sea superior a 3 y que el primer carácter no sea un número
function comprobarNombre(nombre){
    if(nombre.value.length > 3 && isNaN(nombre.value[0])) {
        //console.log("Nombre correcto y elimina fondoRojo");
        nombre.classList.remove("fondoRojo");
        return true;
    }
    //console.log("error y marca en fondoRojo");
    nombre.classList.add("fondoRojo");
    return false;
}

//Función que devuelve si true si es un número válido
function comprobarNumPartidas(partida){
    //Dado que el HTML controla que se introduce un número , convertimos a integer si es decimal solo coge la parte entera
    //Debemos comprobar que sea positivo y que sea un entero   //Si el valor está en blanco la función Number.isInteger ya devuelve false
    partidaToInt = Number.parseInt(partida.value);
    if (Number.isInteger(partidaToInt) && partidaToInt>0 ){
        //console.log("Número partidas correcto y borra fondo rojo");
        partida.classList.remove("fondoRojo");
        return true;
    }
    partida.classList.add("fondoRojo");
    return false;
} 

//Comprobar ganador //Comparar eleccionJugador con eleccionMaquina
function comprobarGanador(eleccionJugador,eleccionMaquina,nombreJugador){
    // resultado 0-empate  1-jugador1  2-Máquina   
    var mensaje;       
    //He comprobado que restando el índice de la elección entre los usuarios si es -2 o +1 gana el player1 si es 0 empate y para el  resto gana el player2
    if (eleccionJugador-eleccionMaquina==0) 
        return "Empate";
    else if (eleccionJugador-eleccionMaquina==(-2) || eleccionJugador-eleccionMaquina==1) 
        return "Gana "+ nombreJugador;
    else
        return "Gana la máquina";

}
   
//Anotamos registro de las  partidas
function historial(mensaje){
    document.getElementsByTagName("ul")[0].innerHTML+="<li> " + mensaje  +" </li>";
}
   










