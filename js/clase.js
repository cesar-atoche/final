export class generadorCodigo {
    constructor(id, nombre, apellido, genero, nacimiento, curso,...notas) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.apellido = apellido.toLowerCase();
        this.genero = genero;
        this.nacimiento = nacimiento;
        this.curso = curso.toLowerCase();
        this.notas = notas;
    }
    obtienePrimerDigito(cadena) { //obtiene primer digito de cada palabra de cadena con espacios
        let arrayPalabra = cadena.split(" ");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    obtienePrimerDigitoNacimiento(cadena) { //obtiene primer digito de la fecha de nacimiento (dia/mes/año)
        let arrayPalabra = cadena.split("-");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    generaCodigo() {//genera codigo 
        let codigo = `A${this.obtienePrimerDigito(this.nombre)}`;
        codigo += this.obtienePrimerDigito(this.apellido);
        codigo += this.obtienePrimerDigitoNacimiento(this.nacimiento);
        codigo += this.genero;
        return codigo.toUpperCase();
    }
    validaGenero() {
        const string = (this.genero == "M" || this.genero == "m") ? "Masculino": "Femenino";
        return string;
    }
    promedio() {
            let promedio = ((parseInt(this.notas[0]) + parseInt(this.notas[1]) + parseInt(this.notas[2])) / 3).toFixed(2);
            if (promedio === "NaN") promedio = 0;
            return promedio;
    }
}




