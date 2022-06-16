// DEFICION DE VARIABLES 
var turno = 1;
var fichas = ["O", "X"];
var puestas = 0;
var partidaAcabada = false;

// ARREGLOS DE VARIABLES PRA TEXTO Y TABLERO

var textoVictoria = 
	document.getElementById("textoVictoria");

	// document.getElementsByTagName
	// Sirve para reunir tolos los elementos con el mismo nombre "Etiqueta"
	// Array.from
	// sirve para hacer un arreglo tanto en js como en html

var botones = 
	Array.from(document.getElementsByTagName("button"));

	// forEach
	// para todos los botones cuando se haga "click" se ejetute la funcion "ponerFicha"

botones.forEach(
	x => x.addEventListener("click", ponerFicha)
);

function ponerFicha(event){
	var botonPulsado = event.target;

	// para indicar que la pardida no a acabado y que ningun boton a sido pulsado
	// =="") para indicar que el texto o relleno del boton esta vacio

	if(!partidaAcabada && botonPulsado.innerHTML == ""){
		botonPulsado.innerHTML = fichas[turno];
		puestas += 1;

		// visualizar el estado de la partida ganado o perdido

		var estadoPartida = estado();
		if(estadoPartida == 0){
			cambiarTurno();
			if(puestas < 9){
				ia();
				estadoPartida = estado();
				puestas += 1;
				cambiarTurno();	
			}	
		}

		// salida texto de estado de la partida 

		if(estadoPartida == 1){
			textoVictoria.style.visibility = "visible";
			partidaAcabada = true;
		}
		else if(estadoPartida == -1){
			textoVictoria.innerHTML = "Has perdido :("
			partidaAcabada = true;
			textoVictoria.style.visibility = "visible";
		}
	}	
}
// para que juege la maquina
function cambiarTurno(){
	if(turno==1){
		turno = 0;
	}
	else{
		turno = 1;
	}
}
	// comprovar que los elementos sena inguales y tiene que tener algun tipo de valor
function estado(){
	posicionVictoria = 0;
	nEstado = 0;

	// verificar que los valores osn iguales para poder dar respuesta a ususario de victoria o perdida

	function sonIguales(...args){
		valores = args.map(x=>x.innerHTML);
		if(valores[0] != "" && valores.every((x, i, arr) => x===arr[0])){

			// los botones se van a tonar de un color diferente para resaltar la igualdad en la fila o columna y dar la victoria o la perdida

			args.forEach(x => x.style.backgroundColor = "#ff0000")
			return true;
		}
		else{
			return false;
		}
	}

	// TODAS LAS POSIBLES VARIANTES QUE TIENE EL USUARIO PARA GANAR

	if(sonIguales(botones[0], botones[1], botones[2])){
		posicionVictoria = 1;
	}

	else if(sonIguales(botones[3], botones[4], botones[5])){
		posicionVictoria = 2;
	}

	else if(sonIguales(botones[6], botones[7], botones[8])){
		posicionVictoria = 3;
	}

	else if(sonIguales(botones[0], botones[3], botones[6])){
		posicionVictoria = 4;
	}

	else if(sonIguales(botones[1], botones[4], botones[7])){
		posicionVictoria = 5;
	}

	else if(sonIguales(botones[2], botones[5], botones[8])){
		posicionVictoria = 6;
	}

	else if(sonIguales(botones[0], botones[4], botones[8])){
		posicionVictoria = 7;
	}

	else if(sonIguales(botones[2], botones[4], botones[6])){
		posicionVictoria = 8;
	}


	if(posicionVictoria > 0){
		if(turno == 1){
			nEstado = 1;
		}
		else{
			nEstado = -1;
		}
	}

	return nEstado;
}

// RELIZA OPERACIONES CON VALORES ALEATORIOS TENIENDO EN CUETA LAS LIMIETACIONES COMO SON LOS BOTENES QUE EN TOTAL SON 9

function ia(){
	function aleatorio(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var valores = botones.map(x=>x.innerHTML);
	var pos = -1;

	if(valores[4]==""){
		pos = 4;
	}
	else{
		var n = aleatorio(0, botones.length-1);
		while(valores[n]!=""){
			n = aleatorio(0, botones.length-1); 
		}
		pos = n;
	}

	botones[pos].innerHTML = "O";
	return pos;
}
