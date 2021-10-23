import { eliminarCita,cargarEdicion } from '../funciones.js'
import { caja,formulario, consultas } from '../selectores.js'

class UI{
    //IMprime un mensaje de alerta de error
    imprimirAlerta(mensaje,type){

        var newElement= document.createElement('p')
        newElement.setAttribute("class", "error");
        newElement.setAttribute('id','msgError');
        newElement.style.borderRadius= '5px';
        newElement.textContent = mensaje;
         
        if(type === true){
            newElement.style.backgroundColor = '#E62020';
        } else {
            newElement.style.backgroundColor = 'green';
        }

        caja.appendChild(newElement); 
        formulario.disabled = true;

        setTimeout( () => {
            var error = document.querySelector('#msgError')
            
            error.remove()

            formulario.disabled = false;
        }, 5000);
    }


    //IMprimir las citas
    imprimirCitas({citas}){

        //limpiar las citas anteriores
        this.limpiarHTML();

        citas.forEach(cita => {
            const { mascota,propietario,telefono, fecha, hora, sintomas, id } = cita;

            //Guarda todo el html para inyectar todo ese codigo de una sola vez
            const fragment = document.createDocumentFragment();

            consultas.style.setProperty("background-color", "white"); 

            var titulo = document.createElement('h3');
            titulo.setAttribute('class','caja_title')
            titulo.textContent = 'Fecha de Consulta';

            consultas.appendChild(titulo)

            var contenedor = document.createElement('div');
            contenedor.setAttribute('class','container');

            consultas.appendChild(contenedor);

            var titulo_mascota= document.createElement('h4');
            titulo_mascota.setAttribute('class','tittle_mascota');
            titulo_mascota.textContent= mascota;


            fragment.appendChild(titulo_mascota);

            var valor_propietario = document.createElement('p')
            valor_propietario.textContent = 'Propietario: ' + propietario;

            fragment.appendChild(valor_propietario);

            var valor_telefono = document.createElement('p');
            valor_telefono.textContent = 'Telefono: ' + telefono;

            fragment.appendChild(valor_telefono);

            var valor_fecha = document.createElement('p');
            valor_fecha.textContent = 'Fecha: ' + fecha;

            fragment.appendChild(valor_fecha);

            var valor_hora = document.createElement('p');
            valor_hora.textContent = 'Hora: ' + hora;

            fragment.appendChild(valor_hora);

            var valor_sintomas = document.createElement('p');
            valor_sintomas.textContent = 'Sintomas: ' + sintomas;

            fragment.appendChild(valor_sintomas);


            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.setAttribute('class','jump');
            btnEliminar.style.backgroundColor = '#E62020';
            btnEliminar.style.borderRadius= '5px';

            btnEliminar.onclick = () => eliminarCita(id);

            var btnEditar = document.createElement('button')
            btnEditar.setAttribute('class','jump');
            btnEditar.innerHTML = 'Editar';
            btnEditar.style.backgroundColor = '#38ef7d';
            btnEditar.style.borderRadius= '5px';

            btnEditar.onclick = () => cargarEdicion(cita);

            fragment.appendChild(btnEliminar);
            fragment.appendChild(btnEditar);

            consultas.appendChild(fragment);
        });
    }

    //limpiar las citas anteriores
    limpiarHTML(){
        while (consultas.firstChild) {
            consultas.removeChild(consultas.firstChild);
          }
    }
}

export default UI;