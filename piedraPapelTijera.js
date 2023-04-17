// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //



// Pruebas recuperar ElementsByName
var nombre = document.getElementsByName("nombre");
var partidas = document.getElementsByName("partidas");



nombre[0].addEventListener("blur", function(){
    comprobarNombre(nombre[0].value);
})

partidas[0].addEventListener("blur", function(){
   compruebaNumPartidas(partidas[0].value);
})






//Función que comprobará a calidad del nombre
//Comprobará que la longitud sea superior a 3 y
// que el primer carácter no sea un número
function comprobarNombre(nombre){
   
    if(nombre.length > 3 && isNaN(nombre[0])) {
        console.log("correcto");

        nombre.classList.add("seleccionado");
        nombre.classList.remove("fondoRojo");
        return true;
    }
    console.log("error");
    nombre.classList.add("fondoRojo");
    return false;
}

//Función que devuelve si true si es un número válido
function compruebaNumPartidas(numPartidas){
    //Dado que el HTML controla que se introduce un número
    //Como convertimos a integer si es decimal solo coge la parte entera
    //Debemos comprobar que sea positivo y que sea un entero
    //Si el valor está en blanco la función Number.isInteger ya devuelve false

    numPartidas = Number.parseInt(numPartidas);
    if (Number.isInteger(numPartidas) && numPartidas>0 ){
        console.log("correcto");
        numPartidas.classList.remove("fondoRojo");
        return true;
    }
    console.log("error");
    numPartidas.classList.add("fondoRojo");
    
    return false;
   }

