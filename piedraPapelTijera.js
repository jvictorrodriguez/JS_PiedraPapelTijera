// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //



//Asignamos variables a elementos
//inputs
var nombres = document.getElementsByName("nombre");
var partidas = document.getElementsByName("partidas");
//span
var actual= document.getElementById("actual");
var total= document.getElementById("total");
//botones
var botonJugar=document.getElementsByTagName("button")[0];
var botonYa=document.getElementsByTagName("button")[1];
var botonReset=document.getElementsByTagName("button")[2];
//variables globales
var eleccionJugador=0;
var eleccionMaquina=0;
var resultado; // 0-empate  1-jugador1  2-Máquina
var parametrosConfigurados; // Nombre y partidas informados correctamente



//Añadimos Listeners
//inputs
nombres[0].addEventListener("blur", function(){
    comprobarNombre(nombres[0]);
})

partidas[0].addEventListener("blur", function(){
   comprobarNumPartidas(partidas[0]);
})

//Botones
botonJugar.addEventListener("click",function(){
    console.log("Presionaste el botón Jugar");
   //Comprobamos si los valores de los imputs son correctos y actualizamos
   //el contador de partidas
 /*   console.log("Comprobar nombre es : "+ comprobarNombre(nombres[0]));
   console.log("ComprobarNumPartidas es : "+ numPartidas(partidas[0])); */
    if (comprobarNombre(nombres[0]) && comprobarNumPartidas(partidas[0])) {
        console.log("Ha entrado en el if");
        //Si ambos son correctos
        parametrosConfigurados=true;
        //bloqueamos la edición de los campos
        // Nombre y Partidas
        nombres[0].disabled="true";
        partidas[0].disabled="true";
        
        actual=1;
        total=partidas[0].value;

       /*  
        actual.innerHTML=actual;
        total.textContent=total; */

        document.getElementById("actual").innerHTML=actual;
        document.getElementById("total").innerHTML=total;
        
    }
   
})
botonYa.addEventListener("click",function(){
    /* console.log("Presionaste el botón Ya"); */
    if(parametrosConfigurados &&  actual<=total){

        seleccionMaquina();
        var ganador= comprobarGanador();
        historial(ganador);
        document.getElementById("actual").innerHTML=actual;
        actual++;
    }
})
botonReset.addEventListener("click",function(){
    console.log("Presionaste el botón Reset");
    
    document.querySelector("form").reset();
    
    parametrosConfigurados=false;
    /* nombres[0]="";
    nombres[0].focus;
    partidas[0]=0; */




})



/* // Añado el control sobre el evento "submit" del formulario. De esta forma, la función "procesarFormulario" solo recive el evento "submit"
document.getElementsByTagName('form')[0].addEventListener("submit", procesarFormulario, false); */





//Imágenes Jugador1
var imagenes= document.getElementsByTagName("img");

imagenes[0].src="img/piedraJugador.png";
imagenes[1].src="img/papelJugador.png";
imagenes[2].src="img/tijeraJugador.png";


//Selección de icono Jugador1
for(let i=0; i<posibilidades.length; i++){
    
    imagenes[i].onclick = function(){
        console.log(imagenes[i])
        
        for(let i=0; i<posibilidades.length; i++){
                imagenes[i].classList.remove("seleccionado");
                imagenes[i].classList.add("noSeleccionado");
            }
        
        imagenes[i].classList.add("seleccionado");
        imagenes[i].classList.remove("noSeleccionado");
        eleccionJugador= i;
        console.log("Elección jugador "+ i + posibilidades[i]);
    }
}

function seleccionMaquina(){

    //Selección Máquina
    
    var imagenMaquina = []
    imagenMaquina[0]="img/piedraOrdenador.png";
    imagenMaquina[1]="img/papelOrdenador.png";
    imagenMaquina[2]="img/tijeraOrdenador.png";
    
    eleccionMaquina = Math.floor(Math.random() * posibilidades.length)
    
    imagenes[posibilidades.length].src=imagenMaquina[eleccionMaquina];
    
}


//Comprobar ganador
//Comparar eleccionJugador con eleccionMaquina

function comprobarGanador(){

 // 0-empate  1-jugador1  2-Máquina   
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
    /* console.log(resultado); */
}
    


//Anotamos registro de las  partidas
function historial(ganador){
    document.getElementsByTagName("ul")[0].innerHTML+="<li> " + ganador  +" </li>";
}




//Función que comprobará a calidad del nombre
//Comprobará que la longitud sea superior a 3 y
// que el primer carácter no sea un número
function comprobarNombre(nombre){
   
    if(nombre.value.length > 3 && isNaN(nombre.value[0])) {
        console.log("correcto");
        nombre.classList.remove("fondoRojo");
        return true;
    }
    console.log("error");
    nombre.classList.add("fondoRojo");
    return false;
}

//Función que devuelve si true si es un número válido
function comprobarNumPartidas(numPartidas){
    //Dado que el HTML controla que se introduce un número
    //Como convertimos a integer si es decimal solo coge la parte entera
    //Debemos comprobar que sea positivo y que sea un entero
    //Si el valor está en blanco la función Number.isInteger ya devuelve false

    numPartidas = Number.parseInt(numPartidas.value);
    console.log("Num partidas " + numPartidas);
    if (Number.isInteger(numPartidas) && numPartidas>0 ){
        console.log("correcto");
        partidas[0].classList.remove("fondoRojo");
        return true;
    }
    console.log("error");
    partidas[0].classList.add("fondoRojo");
    
    return false;
   } 

