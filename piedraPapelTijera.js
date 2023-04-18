// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//    //
var comentarios=false;

// B O T O N E S
//Asignar variables
var botonJugar=document.getElementsByTagName("button")[0];
var botonYa=document.getElementsByTagName("button")[1];
var botonReset=document.getElementsByTagName("button")[2];

//Asignar listeners
botonJugar.addEventListener("click",jugar);
botonYa.addEventListener("click",ya);
botonReset.addEventListener("click",reset);


//Imágenes Jugador1
let imagenes= document.getElementsByTagName("img");
for (let i=0;i<posibilidades.length;i++){
    imagenes[i].src="img/"+ posibilidades[i]+ "Jugador"+".png";
    if (comentarios) console.log(imagenes[i]);
}





//Inicia el programa
reset();



//Selección de icono Jugador1
for(let i=0; i<posibilidades.length; i++){
    imagenes[i].onclick = function(){
        //console.log(imagenes[i])        //Muestra por consola la imagen seleccionada
        //Inicializamos los estados de las imagenes
       resetSeleccionImagen(imagenes);
        //Marcamos la seleccionada
        imagenes[i].classList.add("seleccionado");
        imagenes[i].classList.remove("noSeleccionado");
        //Guarda la variable eleccionJugador 
        eleccionJugador= i;
        //Muestra por consola los valores seleccionados
        console.log("Elección jugador "+ i + posibilidades[i]);
    }
}

// F U N C I O N E S
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
        muestraNumeroPartidas(1,partidas[0].value);
    }
}

function ya(){
    if (comentarios) console.log("Entraste en la función ya");
    //
    let eleccionMaquina=seleccionMaquina();
    var ganador= comprobarGanador(eleccionJugador,eleccionMaquina);
    historial(ganador);
    muestraNumeroPartidas(contadorPartida,partidas[0].value);
    
    document.getElementById("actual").innerHTML=actual;
    
}

function reset(){
    /* console.log("Entraste en la función reset"); */
    //Reiniciamos las variables
    let nombres = document.getElementsByName("nombre");     //En plural pq es un array
    let partidas = document.getElementsByName("partidas");  //En plural pq es un array
    
    nombres[0].disabled=false;
    partidas[0].disabled=false;
    botonJugar.disabled=false;
    botonYa.disabled=true;
    let contadorPartida=0;
    eleccionJugador=0;
    historial("Nueva Partida");

}

function resetSeleccionImagen(imagenes){
    for(let i=0; i<posibilidades.length; i++){
        imagenes[i].classList.remove("seleccionado");
        imagenes[i].classList.add("noSeleccionado");
    }
}



function muestraNumeroPartidas(contadorPartida, totalPartidas){
    //Asignamos variables a los span de número de partidas
    let actual = document.getElementById("actual");
    let total = document.getElementById("total");

 
    //Asignamos valores a los span
    actual.innerHTML=contadorPartida;
    total.innerHTML=totalPartidas;
}


function seleccionMaquina(){
        //Selección Máquina      
        var imagenMaquina = []
        for (let i=0;i<posibilidades.length;i++){
            imagenMaquina[i]="img/"+ posibilidades[i]+ "Ordenador"+".png";
            if (comentarios) console.log(imagenes[i]);
        }
       
        
        let eleccionMaquina = Math.floor(Math.random() * posibilidades.length)
        imagenes[posibilidades.length].src=imagenMaquina[eleccionMaquina];
        return eleccionMaquina;
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
    //console.log("error número partidas y pinta fondoRojo");
    partida.classList.add("fondoRojo");
    return false;
} 


//Comprobar ganador //Comparar eleccionJugador con eleccionMaquina
function comprobarGanador(eleccionJugador,eleccionMaquina){
    // resultado 0-empate  1-jugador1  2-Máquina   
    var mensaje;       
       if (eleccionJugador==eleccionMaquina) resultado=0;//empate 0 
       else if (eleccionJugador==0  //piedra
       && eleccionMaquina==1) //papel
       resultado=2;
       else if (eleccionJugador==1   //papel 
       && eleccionMaquina==2) //tijeras
       resultado=2;
       else if (eleccionJugador==2 //tijeras
       && eleccionMaquina==0) //piedra
       resultado=2;
       else if (eleccionJugador==0 //piedra
       &&eleccionMaquina==2) //tijera
       resultado=1;
       else if (eleccionJugador==1  //papel
       &&  eleccionMaquina==0) //piedra
       resultado=1;
       else if (eleccionJugador==2  //tijera
       &&  eleccionMaquina==1) //papel
       resultado=1;
       
       if(resultado==0) return "Empate";
       else if (resultado==1) return "Ganaste";
       return "Ganó la máquina"; 
}
   
//Anotamos registro de las  partidas
function historial(mensaje){
    document.getElementsByTagName("ul")[0].innerHTML+="<li> " + mensaje  +" </li>";
}
   










