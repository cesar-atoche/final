import { array } from './app.js';
import { generadorCodigo } from './clase.js';
import { tablita, tbody } from './selectores.js';


let ind = 0;

//FUNCIONES

//funcion agrega objeto al array
export function alCargar(array) {
    for (const iterator of array) {
        // console.log("dentro de cargar",array)
        const alcargar = new generadorCodigo(ind, iterator.nombre, iterator.apellido, iterator.genero, iterator.nacimiento, iterator.curso, iterator.notas[0], iterator.notas[1], iterator.notas[2]);
        agregaArray(alcargar)
        ind++;
    }
}

//funcion guarda en localstorage
function sincronizarStorage() {
    localStorage.setItem('Alumno', JSON.stringify(array));
}

//agrega al array
function agregaArray(objetoCodigo) {
    array.push(objetoCodigo);
    mostrar(array)
}


//imprime  el array
export function mostrar(array) {
    try {
        tablita.innerHTML = "";
        for (let [key, iterator] of Object.entries(array)) {
            const btnEditar = boton("Editar");
            const btnEliminar = boton("Eliminar");
            //evento click boton editar
            btnEditar.addEventListener("click", () => {
                agregaEdicion(key);
            });
            //evento click boton eliminar
            btnEliminar.addEventListener("click", () => {
                eliminar(key);
            });
            const row = document.createElement('tr');
            row.setAttribute("class", "text-black align-middle");
            row.innerHTML = `
        <td>0${iterator.id}</td>
        <td >${iterator.generaCodigo()}</td>
        <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
        <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
        <td>${iterator.validaGenero()}</td>
        <td>${iterator.nacimiento}</td>
        <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
        <td id="tdEditar"></td>
        <td></td>`
            tablita.appendChild(row);
            //agregamos botones
            row.children[7].appendChild(btnEditar)
            row.children[8].appendChild(btnEliminar)
            sincronizarStorage()
        }
    } catch (e) {

    }
}

//funcion crea boton
function boton(valor) {
    const boton = document.createElement("input");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", valor);
    if (valor == "Editar") {
        boton.setAttribute("class", "btn btn-warning");
        boton.setAttribute("data-bs-target", "#modal-editar");
        boton.setAttribute("data-bs-toggle", "modal");
    }
    else if (valor == "EditarN") {
        boton.setAttribute("class", "btn btn-warning");
        boton.setAttribute("value", "Editar");
    }
    else {
        boton.setAttribute("class", "btn btn-danger");
    }
    return boton;
}

//funcion primera letra mayuscula
function capitalizarPrimeraLetra(str) {
    let arrayPalabra = str.split(" ");
    let obtiene = "";
    for (const key in arrayPalabra) {
        let elemento = arrayPalabra[key];
        obtiene += elemento.charAt(0).toUpperCase() + elemento.slice(1) + " ";
    }
    return obtiene;
}

//agrega value en el modal editar
function agregaEdicion(indice) {
    limpiarFormulario("formulario1");
    document.getElementById("edicion-nombre").setAttribute("value", array[indice].nombre);
    document.getElementById("edicion-apellido").setAttribute("value", array[indice].apellido);
    document.getElementById("edicion-genero").setAttribute("value", array[indice].genero);
    document.getElementById("edicion-nacimiento").setAttribute("value", array[indice].nacimiento);
    document.getElementById("edicion-curso").setAttribute("value", array[indice].curso);
    document.getElementById("indice").setAttribute("value", indice);

}

//funcion editar el array
export function editarAlumno() {
    let gen = document.getElementById("edicion-genero").value;
    if (gen.toUpperCase() !== "M" && gen.toUpperCase() !== "F") {
        alertas("error", `¡El campo genero debe ser M o F!`, false);
        return false;
    }
    let indice = document.getElementById("indice").value;
    array[indice].nombre = document.getElementById("edicion-nombre").value;
    array[indice].apellido = document.getElementById("edicion-apellido").value;
    array[indice].genero = gen;
    array[indice].nacimiento = document.getElementById("edicion-nacimiento").value;
    array[indice].curso = document.getElementById("edicion-curso").value;
    alertas("success", `El alumno ${array[indice].apellido.toUpperCase()} fue guardado con exito`, true)
    mostrar(array);
}

//funcion agregar alumno
export function agregarAlumno() {
    let formularioAgregar = document.querySelector("#formulario");
    let arrAgregarAlumno = [];
    for (const iterator of formularioAgregar.children) {
        let aux = iterator.children[1].children[0].id;
        let valor = document.getElementById(aux).value;
        if (valor == null || valor.length == 0) {
            alertas("error", `¡El campo ${aux.toUpperCase()} debe tener un valor!`, false);
            return false;
        }
        if (valor == "Genero" || valor == "genero") {
            alertas("error", `¡El campo ${aux.toUpperCase()} debe ser M o F!`, false);
            return false;
        }
        arrAgregarAlumno.push(valor);
    }
    const agregado = new generadorCodigo(ind++, ...arrAgregarAlumno);
    alertas("success", `El alumno ${arrAgregarAlumno[1].toUpperCase()} fue guardado con exito`, true)
    agregaArray(agregado)
    tablita.innerHTML = "";
    mostrar(array)
    limpiarFormulario("formulario")
}

//funcion alertas con libreria sweetalert
function alertas(icono, mensaje, toast) {
    Swal.fire({
        toast: toast,
        icon: icono,
        // position: "top-end",
        showConfirmButton: false,
        text: mensaje,
        timer: 1500,
        background: "white",
        color: "color"
    })
}

//elimina elementos
function eliminar(indice) {
    array.splice(indice, 1);
    mostrar(array)
    alertas("warning", `El alumno fue eliminado`, true)
}

//funcion limpiar formulario
function limpiarFormulario(nombre) {
    document.getElementById(nombre).reset();
    return true;
}

//funcion busca por nombre y apellido
export function buscarAlumno(bus) {
    const resultNombre = array.filter(arr => arr.nombre.includes(bus.toLowerCase()));
    const resultApellido = array.filter(arr => arr.apellido.includes(bus.toLowerCase()));
    const dataArr = [...new Set([...resultNombre, ...resultApellido])];
    mostrar(dataArr)
}

//funcion filtrar
export function filtrarAlumnos() {
    let arraynuevo = array.map((x) => x);
    let filtrar = document.getElementById("filtrar").value;
    if (filtrar == 1) { //filtra por nombre
        arraynuevo.sort((x, y) => {
            if (x.nombre < y.nombre) { return -1 }
            if (x.nombre > y.nombre) { return 1 }
            return 0

        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 2) { //filtra por apellido
        arraynuevo.sort((x, y) => {
            if (x.apellido < y.apellido) { return -1 }
            if (x.apellido > y.apellido) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 3) {
        arraynuevo.sort((x, y) => {//filtra por curso
            if (x.curso < y.curso) { return -1 }
            if (x.curso > y.curso) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 4) {
        arraynuevo.sort((x, y) => {//filtra por genero
            if (x.genero < y.genero) { return -1 }
            if (x.genero > y.genero) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
}


//notass

//funcion muestra notas

export function mostrarNotas(array) {
    try {
        tbody.innerHTML = "";
        for (let [key, iterator] of Object.entries(array)) {
            const btnEditarNota = boton("EditarN");
            const btnGuardarNota = boton("Guardar");
            //evento click boton editar
            btnEditarNota.addEventListener("click", () => {
                editarNota(key);
            });
            //evento click boton eliminar
            btnGuardarNota.addEventListener("click", () => {
                guardarNota(key);
            });
            const row = document.createElement('tr');
            row.setAttribute("class", "text-black align-middle");
            row.innerHTML = `
            <td>00${iterator.id}</td>
            <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
            <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
            <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
            <td><input type="text" size="1" id ="nota1${key}" value="${iterator.notas[0] || 0}" disabled></td>
            <td><input type="text" size="1" id ="nota2${key}" value="${iterator.notas[1] || 0}" disabled></td>
            <td><input type="text" size="1" id ="nota3${key}" value="${iterator.notas[2] || 0}" disabled></td>
            <td><input type="text" size="1" id ="promedio" value="${iterator.promedio()}" disabled></td>
            <td id="tdEditar"></td>
            <td></td>`
            tbody.appendChild(row);
            //agregamos botones
            row.children[8].appendChild(btnEditarNota)
            row.children[9].appendChild(btnGuardarNota)
            sincronizarStorage()
        }
    } catch (e) {

    }
}



//guarda en el array
function guardarNota(indice) {
    for (let i = 0; i < 3; i++) {
        array[indice].notas[i] = document.getElementById(`nota${i + 1}${indice}`).value;
    }
    mostrarNotas(array);
    alertas("success", `Las notas fueron guardadas con exito`, true)
}

//edita los input y los habilita 
function editarNota(indice) {
    for (let i = 0; i < 3; i++) {
        document.getElementById(`nota${i + 1}${indice}`).removeAttribute("disabled")
    }
}
