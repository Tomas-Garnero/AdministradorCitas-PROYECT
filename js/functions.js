import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from "./selectors.js";

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;
let DB;


// Obj con la info de la cita
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

// Agrega datos al obj de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de cita
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la info del obj de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    if(editando) {
        // Pasar el obj de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        ui.imprimirAlerta("Editado correctamente");

        // Regresar el texto del boton a su estado original
        formulario.querySelector(`button[type="submit"]`).textContent = "Crear cita";

        // Quitar modo edicion
        editando = false;

    } else {
        // Generar ID unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta("Se agregó correctamente");
    }

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

    // Reiniciar el obj para la validacion
    reiniciarObj();

    // Reiniciar el form
    formulario.reset();
}

export function reiniciarObj() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirAlerta("La cita se elimino correctamente");

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

// Carga de datos y el modo edicion
export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Cambiar el texto del boton
    formulario.querySelector(`button[type="submit"]`).textContent = "Guardar cambios";

    editando = true;
}

// Crear DB
export function crearDB() {

    // Crear db en version 1.0
    const crearDB = window.indexedDB.open("citas", 1);

    // Si hay un error
    crearDB.onerror = function() {
        console.log("Hubo un error");
    }

    // Si todo sale bien
    crearDB.onsuccess = function() {
        console.log("DB creada");

        DB = crearDB.result;
        console.log(DB);
    }

    // Definir el schema
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore("citas", {
            keyPath: "id",
            autoIncrement: true
        })

        // Definir todas las columnas
        objectStore.createIndex("mascota", "mascota", {unique: false});
        objectStore.createIndex("propietario", "propietario", {unique: false});
        objectStore.createIndex("telefono", "telefono", {unique: false});
        objectStore.createIndex("fecha", "fecha", {unique: false});
        objectStore.createIndex("hora", "hora", {unique: false});
        objectStore.createIndex("sintomas", "sintomas", {unique: false});
        objectStore.createIndex("id", "id", {unique: true});

        console.log("DB Creada y Lista");
        
    }


}