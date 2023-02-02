import { datosCita, nuevaCita, crearDB } from "../functions.js";
import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from "../selectors.js";


class App {

    constructor() {
        this.initApp();
        this.createDB();
    }
    initApp() {
        mascotaInput.addEventListener("change", datosCita);
        propietarioInput.addEventListener("change", datosCita);
        telefonoInput.addEventListener("change", datosCita);
        fechaInput.addEventListener("change", datosCita);
        horaInput.addEventListener("change", datosCita);
        sintomasInput.addEventListener("change", datosCita);

        // Formulario para nuevas citas
        formulario.addEventListener("submit", nuevaCita);
    }

    createDB() {
        crearDB();
    }
}

export default App;