// Mejora para optimizar cambios

var PeonB = "background-image: url(./img/PeonB.png); background-size:cover;";
var PeonN = "background-image: url(./img/PeonN.png); background-size:cover;";
var AlfilB = "background-image: url(./img/AlfilB.png); background-size:cover;";
var AlfilN = "background-image: url(./img/AlfilN.png); background-size:cover;";


var borrarCelda = "background-image: none; background-size:cover;";

var contadorPaso = 0;
var j = 0;

/*True es para las blancas y false para las negras*/
var tokens = "";
var i = 0;
var turno = true;
var texto = "";
var columna = "";
var renglon = "";
var posicion = "";
var jaque = "";

function reglas() {
  alert(`Notación de piezas:

    Rey: K
    Reina: Q
    Torre: R
    Alfil: B
    Caballo: N
    Peón: no se indica ninguna letra (por ejemplo, e4)
    Notación de columnas:
    
    Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
    Notación de filas:
    
    Las filas se indican con números del 1 al 8. El lado de las blancas está en las filas 1 y 2, mientras que el lado de las negras está en las filas 7 y 8.
    Notación de movimientos:
    
    Se utiliza la notación abreviada de la pieza seguida de la casilla a la que se mueve. Por ejemplo, Re4 significa que el Rey se mueve a la casilla e4.
    Capturas:
    
    Cuando una pieza captura a otra, se utiliza "x" para indicar la captura. Por ejemplo, Bxe4 significa que el Alfil captura en la casilla e4.
    Enroque:
    
    El enroque corto se indica con O-O y el enroque largo se indica con O-O-O.
    Peones:
    
    Cuando un peón avanza sin capturar, solo se indica la casilla de destino. Por ejemplo, e4 significa que el peón se mueve a e4.
    Promoción de peones:
    
    Cuando un peón alcanza la octava fila, se promociona a otra pieza (generalmente una reina). La promoción se indica agregando la letra de la pieza deseada después del movimiento del peón. Por ejemplo, e8=Q significa que el peón en e8 se promociona a una reina.
    Jaque:
    
    Se indica con el símbolo "+" al final del movimiento. Por ejemplo, Nf7+ significa que el Caballo ha dado jaque.
    Jaque mate:
    
    Se indica con el símbolo "#" al final del movimiento. Por ejemplo, Qh8# significa que la Reina ha dado jaque mate.`);
}
function rules() {
  alert(`Piece Notation:

  King: K
  Queen: Q
  Rook: R
  Bishop: B
  Knight: N
  Pawn: no letter is indicated (e.g., e4)

  Column Notation: 
  Columns are indicated with letters from "a" to "h". The leftmost column is "a" and the rightmost column is "h".
  
  Row Notation:
  Rows are indicated with numbers from 1 to 8. White's side is on rows 1 and 2, while Black's side is on rows 7 and 8.
  
  Move Notation:
  The abbreviated notation of the piece followed by the square it moves to is used. For example, Ke4 means that the King moves to the square e4.
  
  Captures:
  When a piece captures another, "x" is used to indicate the capture. For example, Bxe4 means that the Bishop captures on the square e4.
  
  Castling:
  Short castling is indicated with O-O and long castling is indicated with O-O-O.
  
  Pawns:
  When a pawn moves without capturing, only the destination square is indicated. For example, e4 means that the pawn moves to e4.
  
  Pawn Promotion:
  When a pawn reaches the eighth rank, it is promoted to another piece (usually a queen). The promotion is indicated by adding the letter of the desired piece after the pawn's move. For example, e8=Q means that the pawn on e8 is promoted to a queen.
  
  Check:
  It is indicated with the "+" symbol at the end of the move. For example, Nf7+ means that the Knight has given check.
  
  Checkmate:
  It is indicated with the "#" symbol at the end of the move. For example, Qh8# means that the Queen has given checkmate.`);
}



function removernumero() {

  texto = document.getElementById("textarea1").value.replace(/\d+\.\s*/g, "");
}
function getTokens() {
  tokens = texto.split(/\s+/);


}
function pasos() {
  var pieza = "";
  var tabla = document.getElementById("Tablero");
  if (!tieneMayusculas(tokens[i])) {
    pieza = "peon";
    jaque = "";

    if (tokens[i].match(".x.")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      //mueven blancas

      tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonB;

      if (tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) + 1].style.backgroundImage != "none") {
        tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) + 1].style = borrarCelda;

      }
      else {
        tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna) - 1].style = borrarCelda;
      }

    }
    else if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    else if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    } else {
      //aqui hubo un movimiento de peon normal
      posicion = tokens[i].split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      if (turno) {
        //mueven blancas

        tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonB;

        if (tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna)].style.backgroundImage != "")
          tabla.rows[convertirRenglon(renglon) + 1].cells[convertirLetraNumero(columna)].style = borrarCelda;
        else
          tabla.rows[convertirRenglon(renglon) + 2].cells[convertirLetraNumero(columna)].style = borrarCelda;

      } else {
        //mueven negras
        tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = PeonN;

        if (tabla.rows[convertirRenglon(renglon) - 1].cells[convertirLetraNumero(columna)].style.backgroundImage != "")

          tabla.rows[convertirRenglon(renglon) - 1].cells[convertirLetraNumero(columna)].style = borrarCelda;

        else

          tabla.rows[convertirRenglon(renglon) - 2].cells[convertirLetraNumero(columna)].style = borrarCelda;
      }
    }

  } else if (tokens[i].startsWith("N")) {
    pieza = "caballo";
    jaque = "";
    if (tokens[i].startsWith("Nx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    } else {
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("B")) {
    pieza = "Alfil";
    jaque = "";
    if (tokens[i].startsWith("Bx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    } else {
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }

    //alert("alfil");
    if (turno) {
      tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = AlfilB;

      var c = convertirLetraNumero(columna) + 1;
      var ci = convertirLetraNumero(columna) - 1;

      for (let i = convertirRenglon(renglon) + 1; i < 9; i++) {
        alert(i + " " + c + " " + tabla.rows[i].cells[c].style.backgroundImage);

        if (tabla.rows[i].cells[c].style.backgroundImage == `url("./img/AlfilB.png")`) {
          alert("borrar" + " " + i + " " + c + " " + tabla.rows[i].cells[c].style.backgroundImage);

          tabla.rows[i].cells[c].style = borrarCelda;
        }

        if (tabla.rows[i].cells[ci].style.backgroundImage == `url("./img/AlfilB.png")`) {
          alert("borrar" + " " + i + " " + ci + " " + tabla.rows[i].cells[ci].style.backgroundImage);

          tabla.rows[i].cells[ci].style = borrarCelda;
        }

        c++;
        ci--;
      }
    }
    else {
      tabla.rows[convertirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = AlfilN;

      var c = convertirLetraNumero(columna) + 1;
      var ci = convertirLetraNumero(columna) - 1;

      for (let i = convertirRenglon(renglon) - 1; i > 0; i--) {
        alert(i + " " + c + " " + tabla.rows[i].cells[c].style.backgroundImage);

        if (tabla.rows[i].cells[c].style.backgroundImage == `url("./img/AlfilN.png")`) {
          alert("borrar" + " " + i + " " + c + " " + tabla.rows[i].cells[c].style.backgroundImage);

          tabla.rows[i].cells[c].style = borrarCelda;
        }

        if (tabla.rows[i].cells[ci].style.backgroundImage == `url("./img/AlfilN.png")`) {
          alert("borrar" + " " + i + " " + ci + " " + tabla.rows[i].cells[ci].style.backgroundImage);

          tabla.rows[i].cells[ci].style = borrarCelda;
        }

        c++;
        ci--;
      }
    }
  } else if (tokens[i].startsWith("K")) {
    pieza = "Rey";
    jaque = "";
    if (tokens[i].startsWith("Kx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    }
    else if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    else if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    } else {
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    }
  } else if (tokens[i].startsWith("Q")) {
    pieza = "Reina";
    jaque = "";
    if (tokens[i].startsWith("Qx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    } else {
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].replace("x", "");
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("R")) {
    pieza = "Torre";
    jaque = "";
    if (tokens[i].startsWith("Rx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    } else {
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("O")) {
    pieza = "Enroque";
    jaque = "";
  }
  document.getElementById("turno").innerHTML =
    "Movimiento: " +
    (i + 1) +
    " Turno " +
    (turno == true ? "blancas " : " negras ") +
    tokens[i++] +
    " " +
    pieza +
    " y se va a mover a Columna:" +
    columna +
    " Renglon:" +
    renglon +
    " " +
    jaque;
  turno = !turno;
}

function iniciar() {
  var celdas = document.getElementById("Tablero");
  celdas.rows[2].cells[1].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[2].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[3].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[4].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[5].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[6].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[7].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[8].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";

  celdas.rows[7].cells[1].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[2].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[3].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[4].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[5].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[6].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[7].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[8].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";

  celdas.rows[8].cells[3].style =
    "background-image: url(./img/AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[3].style =
    "background-image: url(./img/AlfilN.png); background-size:cover;";
  celdas.rows[8].cells[6].style =
    "background-image: url(./img/AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[6].style =
    "background-image: url(./img/AlfilN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";

  celdas.rows[8].cells[2].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";
  celdas.rows[8].cells[7].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[7].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";

  celdas.rows[8].cells[2].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";

  celdas.rows[8].cells[4].style =
    "background-image: url(./img/ReyB.png); background-size:cover;";
  celdas.rows[1].cells[4].style =
    "background-image: url(./img/ReyN.png); background-size:cover;";

  celdas.rows[8].cells[5].style =
    "background-image: url(./img/ReinaB.png); background-size:cover;";
  celdas.rows[1].cells[5].style =
    "background-image: url(./img/ReinaN.png); background-size:cover;";
}

function partidas() {
  var textarea = document.getElementById("texto");
  var valor = document.getElementById("Combo").value;

  switch (valor) {
    case "0":
      textarea.value = "";
      break;
    case "1":
      textarea.value = "Partida 1";
      break;
    case "2":
      textarea.value = "Partida 2";
      break;
    case "3":
      textarea.value = "Partida 3";
      break;
    default:
      break;
  }
}

function cargarPartida() {
  var archivo = document.getElementById("cargarBoton").files[0];
  var scanner = new FileReader();

  scanner.onload = function (e) {
    document.getElementById("textarea1").value = e.target.result;
    /*document.getElementById("texto").value = document.getElementById("cargarBoton").files;*/
  };
  scanner.readAsText(archivo);
  removernumero();
  getTokens();
}

function pasoApaso() {
  var celdas = document.getElementById("texto").value;
  var tabla = document.getElementById("Tablero");

  var tokens = celdas.split(/\s+/);


  turno = !turno;
  document.getElementById("turno").innerHTML =
    "Turno de las " +
    (turno ? "blancas " : "negras ") +
    //renglon +
    " " +
    //columna +
    " " +
    tokens[j];
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  //}
  //}
  i++;
  j++;
}

function tieneMayusculas(cadena) {
  return /[A-Z]/.test(cadena);
}
function convertirLetraNumero(letra) {
  switch (letra) {
    case "a": return 1; break;
    case "b": return 2; break;
    case "c": return 3; break;
    case "d": return 4;
      break;

    case "e":
      return 5;
      break;

    case "f":
      return 6;
      break;

    case "g":
      return 7;
      break;

    case "h":
      return 8;
      break;
  }
}

function convertirRenglon(renglon) {
  switch (renglon) {
    case "8": return 1;
    case "7": return 2;
    case "6": return 3;
    case "5": return 4; break;
    case "4": return 5; break;
    case "3": return 6; break;
    case "2": return 7; break;
    case "1": return 8; break;
  }

}



function recorrer() {
  var celdas = document.getElementById("Tablero");

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      alert(r + " " + c + " " + celdas.rows[r].cells[c].style.backgroundImage);

    }
  }
}

function cambiarColorCasillas() {
  const colorClaro = document.getElementById("colorClaro").value;
  const colorOscuro = document.getElementById("colorOscuro").value;
  const casillas = document.querySelectorAll("#Tablero td");

  casillas.forEach(casilla => {
      const fila = casilla.parentNode.rowIndex;
      const columna = casilla.cellIndex;

      // Si la fila y la columna son ambas pares o ambas impares, se usa el color claro
      if ((fila % 2 === 0 && columna % 2 === 0) || (fila % 2 === 1 && columna % 2 === 1)) {
          casilla.style.backgroundColor = colorClaro;
      } else {
          casilla.style.backgroundColor = colorOscuro;
      }
  });
}



