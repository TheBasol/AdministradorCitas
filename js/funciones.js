import Citas from './class/Citas.js'
import UI from './class/UI.js'

import { mascotaInput, propietarioINput, telefonoINput, fechaINput,
horaINput, sintomasINput, formulario } from './selectores.js';

const ui= new UI();
const administrarCitas= new Citas();

let editando = false;

//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Registra los datos
export const datosCita= (e) =>{
    citaObj[e.target.name] = e.target.value

}

//Validar y agregar citas
export const nuevaCita = (e) =>{
    e.preventDefault();

    const { mascota,propietario,telefono, fecha, hora, sintomas} = citaObj

    //validar datos
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        reiniciarObj();
        //Vaciar el formulario
        form.reset();
        ui.imprimirAlerta('Todos los campos son obligatorios',true);

        if(editando){
            formulario.innerHTML = 'Crear Cita';
        }

        return;

    } 


    if (editando) {
        ui.imprimirAlerta('Se edito correctamente',false);

        formulario.innerHTML = 'Crear Cita';

        editando= false;

        administrarCitas.editarCita({...citaObj});


    } else {
        //generar id unico
        citaObj.id = Date.now();

        //Envia una copia de la cita 
        administrarCitas.agregarCita({...citaObj});

        ui.imprimirAlerta('Se agrego correctamente',false);
    }

    //Reiniciar objeto para seguir validando
    reiniciarObj();
    
    //Vaciar el formulario
    form.reset();
    
    //Mostrar las citas en html
    ui.imprimirCitas(administrarCitas);

}

export const reiniciarObj = () =>{
    citaObj.mascota = ''
    citaObj.propietario = '';
    citaObj.sintomas = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
}

export const eliminarCita = (id) =>{
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //refrescar citas
    ui.imprimirCitas(administrarCitas);

    ui.imprimirAlerta('La cita se Elimino correctamente',false)
}

export const cargarEdicion= (cita)  =>{
    const { mascota,propietario,telefono, fecha, hora, sintomas, id } = cita;
    mascotaInput.value = mascota;
    propietarioINput.value = propietario;
    telefonoINput.value = telefono;
    fechaINput.value = fecha;
    horaINput.value = hora;
    sintomasINput.value = sintomas;

    formulario.innerHTML = 'Guardar cambios';

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    editando = true;

    window.scrollTo(0, 0);

    mascotaInput.focus();
}
