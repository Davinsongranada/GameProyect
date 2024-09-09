//variables globales
const d = document;
let imgN1 = [
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" },
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" }
];

let imgN2 = [
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" },
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" },
    { nombre: "milan", url: "imagenes/milan.jpg" },
    { nombre: "sevilla", url: "imagenes/sevilla.jpg" },
    { nombre: "milan", url: "imagenes/milan.jpg" },
    { nombre: "sevilla", url: "imagenes/sevilla.jpg" }
]

let imgN3 = [
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" },
    { nombre: "city", url: "imagenes/city.png" },
    { nombre: "atletico", url: "imagenes/atletico.jpg" },
    { nombre: "barselona", url: "imagenes/barselona.jpg" },
    { nombre: "colombia", url: "imagenes/colombia.png" },
    { nombre: "argentina", url: "imagenes/argentina.png" },
    { nombre: "fluminense", url: "imagenes/fluminense.jpg" },
    { nombre: "milan", url: "imagenes/milan.jpg" },
    { nombre: "sevilla", url: "imagenes/sevilla.jpg" },
    { nombre: "milan", url: "imagenes/milan.jpg" },
    { nombre: "sevilla", url: "imagenes/sevilla.jpg" },
    { nombre: "Medellin", url: "imagenes/medellin.png" },
    { nombre: "Medellin", url: "imagenes/medellin.png" },
    { nombre: "Real", url: "imagenes/Real.png" },
    { nombre: "Real", url: "imagenes/Real.png" }
]


let tablero = d.querySelector(".tablero");
let imagenNombre = []; //gurdar nombres de imagen
let imagenID = []; //guardar posiciones de imagen
let aciertos = 0;
let intentos = 0;
let tiempo = 35;
let nivel = 1;
let mostrarNivel = d.querySelector(".nivel");
let mostrarAciertos = d.querySelector(".aciertos");
let mostrarIntentos = d.querySelector(".intentos");
let mostrarTiempo = d.querySelector(".tiempo");
let tiempoTrascurrido;
let btn_iniciar = d.querySelector(".btn-iniciar");
let imagenNivel;
let btnHabilitar =  false;
let sonidoSeleccionar = new Audio("sonidos/seleccion.mp3");
let sonidoAdivino = new Audio("sonidos/adivino.mp3");
let sonidoPaso = new Audio("sonidos/pasoNivel.mp3");
let sonidoPerdio = new Audio("sonidos/perdio.mp3");



//evento para iniciar el juego
btn_iniciar.addEventListener("click", function () {
    if(btnHabilitar == false && nivel == 1){
        btnHabilitar = true;
        nivel1();
    }else if(btnHabilitar == false && nivel == 2){
        btnHabilitar = true;
        nivel2();
    }else if(btnHabilitar == false && nivel == 3){
        btnHabilitar = true;
        nivel3();
    }
});

//clearInterval para parar el tiempo
//clearInterval

//funciones para el tiempo
//setTimeout() ejecuta una vez cuando pasa determinado tiempo
//setInterval() ejecuta un determinado tiempo infiniamente


//imagenes aleatorias
imgN1.sort( ()=>Math.random() - 0.5);

//funcion para colocar las imagenes en el tablero
function colocarImagenes() {
    //agregar imagenes dependiendo el nivel
    if (nivel == 1) {
        imagenNivel = imgN1;
    }else if(nivel == 2) {
        imagenNivel = imgN2;
    }else if(nivel == 3) {
        imagenNivel = imgN3
    }

    //recorrer con un forEach las imagenes del array
    imagenNivel.forEach((imagen, i)=>{
    let div = d.createElement("div"); //crear el div
    div.className = "col-3"; //agreagar la clase col-3 al div
    let img = d.createElement("img"); //crear la etiqueta img
    img.className = "img-fluid altura-img"; //agregar la clase img-fluid a la imagen
    img.id = i; //enumerar las imagenes por medio de un id
    img.src = "imagenes/logo.jpg"; //agregar la ubicacion de la imagen
    img.addEventListener("click", mostrarImg); //gregar evento click a la imagen
    div.appendChild(img); //agregar la imagen al div
    tablero.appendChild(div); //agregar los div al tablero
    });
}

//funcion para mostrar las imagenes ocultas
function mostrarImg() {
    sonidoSeleccionar.play();
    //obtener posicion de la imagen
    let imgID = this.getAttribute("id");
    //alert("# de imagen: "+imgID);
    this.src = imagenNivel[imgID].url; //modificar la url de la imagen
    imagenNombre.push( imagenNivel[imgID].nombre); //guardar los nombres de la imagen
    imagenID.push(imgID); //guardar las posicion de la imagen

    if (imagenNombre.length == 2) {
        setTimeout( compararImg, 500);
    }
}

//funcion para comparar imagenes
function compararImg() {
    let imagenesTablero = d.querySelectorAll(".tablero > div > img");
    if (imagenNombre[0] == imagenNombre[1]) {
        if(imagenID[0] != imagenID[1]){
            //alert("Felicitacion adivinaste una imagen");
            sonidoAdivino.play();
            imagenesTablero[imagenID[0]].src = "imagenes/ok.png";
            imagenesTablero[imagenID[1]].src = "imagenes/ok.png";
            imagenesTablero[imagenID[0]].removeEventListener("click",mostrarImg);
            imagenesTablero[imagenID[1]].removeEventListener("click",mostrarImg);
            aciertos++;
            mostrarAciertos.textContent = aciertos;
        }else{
            alert("Debes escoger otra imagen");
            imagenesTablero[imagenID[0]].src = "imagenes/logo.jpg";
            //imagenesTablero[imagenID[1]].src = "imagenes/logo.jpg";
            intentos++;
            mostrarIntentos.textContent = intentos;
        }
        
    }else{
        //alert("Fallaste las imagenes son diferentes")
        imagenesTablero[imagenID[0]].src = "imagenes/logo.jpg";
        imagenesTablero[imagenID[1]].src = "imagenes/logo.jpg";
        intentos++;
        mostrarIntentos.textContent = intentos;
    }
    imagenNombre = [];
    imagenID = [];

    //detectar cuando se adivinaron todas las imagenes
    if ( nivel == 1 && aciertos == 6 ) {
        sonidoPaso.play();
        //alert("🎉🎉 Felicitaciones pasaste al siguiente nivel 🎉🎉");
        //recargar la pagina
        //location.reload();
        clearInterval(tiempoTrascurrido);
        btnHabilitar = false;
        nivel++;
        mostrarNivel.textContent = nivel;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        tiempo = 45;
        mostrarTiempo.textContent = tiempo;
        quitarImg();
    }else if (nivel == 2 && aciertos == 8) {
        sonidoPaso.play();
        //alert("Felicitaciones pasaste al siguiente nivel 🎉🎉");
        clearInterval(tiempoTrascurrido);
        btnHabilitar = false;
        nivel++;
        mostrarNivel.textContent = nivel;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        tiempo = 50;
        mostrarTiempo.textContent = tiempo;
        quitarImg();
    }else if (nivel == 3 && aciertos == 8) {
        alert("Felicitaciones pasaste todos los niveles🎉🎉");
        clearInterval(tiempoTrascurrido);
        location.reload();
    }
}

//funciones de niveles
function nivel1() {
    //agregar las imagenes al tablero
    colocarImagenes();
    mostrarNivel.textContent = nivel;
    tiempoDeJuego();     
}

function nivel2() {
    imgN2.sort(()=>Math.random() - 0.5);
    colocarImagenes();
    tiempoDeJuego(); 
}

function nivel3() {
    imgN2.sort(()=>Math.random() - 0.5);
    colocarImagenes();     
    tiempoDeJuego();
}

function tiempoDeJuego() {
    //mostrar tiempo
    tiempoTrascurrido = setInterval(()=>{
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 1) {
            sonidoPerdio.play();
        }else if (tiempo == 0) {
            alert("Se te agotó el tiempo😢")
            clearInterval(tiempoTrascurrido);
            location.reload();
        }
    },1000);
}

//funcion para quitar las imagenes del tablero
function quitarImg() {
    let imagenesTablero = d.querySelectorAll(".tablero div");
    imagenesTablero.forEach((img)=>{
        img.remove();
    })
}