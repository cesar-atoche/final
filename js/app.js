import { agregarAlumno, editarAlumno, filtrarAlumnos, buscarAlumno, alCargar, mostrarNotas } from './funciones.js';
import { inputAgregar, guardar, filtrar, buscartxt } from './selectores.js';


export var array = [];
var array1 = [];

//cargamos datos con fetch desde base.json
let URL = "js/base.json"
function doFetch(URL) {
    fetch(URL)
        .then(res => res.json())
        .then(lista_de_personas => {
            //spred operator para copiar el array
            array1 = [...lista_de_personas]
            alCargar(array1)
        })
        .catch(err => console.log(err.message))
}

//EVENTOS

// cargamos los datos
document.addEventListener("DOMContentLoaded", () => {
    let arrayJSON = JSON.parse(localStorage.getItem('Alumno')) || [];

    if (arrayJSON.length == 0) { //si localstorage esta vacio cargamos el json
        doFetch(URL)
    }
    else {
        alCargar(arrayJSON)//cargamos datos de localstorage
    }
    // mostrar(array);
});

//boton agregar Alumno
inputAgregar?.addEventListener("click", () => {
    agregarAlumno();
});

//boton guarda nuevo alumno
guardar?.addEventListener("click", () => {
    editarAlumno();
});

//select filtra alumnos
filtrar?.addEventListener("click", () => {
    filtrarAlumnos();
});

//busca al ir escribiendo
buscartxt?.addEventListener("input", (e) => {
    buscarAlumno(e.target.value);
});


//cargamos el array notas
document.addEventListener('DOMContentLoaded', () => {
    mostrarNotas(array)
});
