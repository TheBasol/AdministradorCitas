import { datosCita,nuevaCita } from '../funciones.js';

import { mascotaInput, propietarioINput, telefonoINput, fechaINput,
horaINput, sintomasINput, formulario } from '../selectores.js';

class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        mascotaInput.addEventListener('input',datosCita);
        propietarioINput.addEventListener('input',datosCita)
        telefonoINput.addEventListener('input',datosCita);
        fechaINput.addEventListener('input',datosCita);
        horaINput.addEventListener('input',datosCita);
        sintomasINput.addEventListener('input',datosCita);
    
        formulario,addEventListener('submit', nuevaCita);
    }

}

export default App;