import { Chofer } from './entidades/choferes';
import { Tripulacion } from './entidades/tripulacion';
import { Bus } from './entidades/buses';
import { Viaje } from './entidades/viajes';
import { Tlistachoferes } from './controladores/TlistaChoferes';
import { Tlistatripulacion } from './controladores/TlistaTripulacion';
import { TlistaBus } from './controladores/TlistaBuses';
import { Tlistaviajes } from './controladores/TlistaViajes';

const listaChoferes = new Tlistachoferes();
const listaTripulaciones = new Tlistatripulacion();
const listaBuses = new TlistaBus();
const listaViajes = new Tlistaviajes();

document.getElementById('form-chofer')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const codigo = (document.getElementById('codigo') as HTMLInputElement).value;
    const cedula = (document.getElementById('cedula') as HTMLInputElement).value;
    const nombres = (document.getElementById('nombres') as HTMLInputElement).value;
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
    const fechanacimiento = (document.getElementById('fechanacimiento') as HTMLInputElement).value;
    const anosConduccion = (document.getElementById('anosConduccion') as HTMLInputElement).value;

    const nuevoChofer = new Chofer(codigo, cedula, nombres, apellidos, fechanacimiento, anosConduccion);
    listaChoferes.Insertar(nuevoChofer);
    actualizarListaChoferes();
});

function actualizarListaChoferes() {
    const listaChoferesElement = document.getElementById('lista-choferes');
    if (listaChoferesElement) {
        listaChoferesElement.innerHTML = '';
        listaChoferes.listarChoferes().forEach(chofer => {
            const row = document.createElement('tr');

            const cellNombre = document.createElement('td');
            cellNombre.textContent = chofer.nombres;
            row.appendChild(cellNombre);

            const cellApellido = document.createElement('td');
            cellApellido.textContent = chofer.apellidos;
            row.appendChild(cellApellido);

            const cellCodigo = document.createElement('td');
            cellCodigo.textContent = chofer.codigo;
            row.appendChild(cellCodigo);

            listaChoferesElement.appendChild(row);
        });
    }

    const choferesTripulacion = document.getElementById('choferesTripulacion') as HTMLSelectElement;
    choferesTripulacion.innerHTML = '';
    listaChoferes.listarChoferes().forEach(chofer => {
        const option = document.createElement('option');
        option.value = chofer.codigo;
        option.text = `${chofer.nombres} ${chofer.apellidos}`;
        choferesTripulacion.appendChild(option);
    });
}


document.getElementById('form-tripulacion')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const codigo = (document.getElementById('codigoTripulacion') as HTMLInputElement).value;
    const choferesSeleccionados = Array.from((document.getElementById('choferesTripulacion') as HTMLSelectElement).selectedOptions)
        .map(option => listaChoferes.listarChoferes().find(chofer => chofer.codigo === option.value)!);

    const nuevaTripulacion = new Tripulacion(codigo);
    nuevaTripulacion.chofer.push(...choferesSeleccionados);
    listaTripulaciones.Insertar(nuevaTripulacion);
    actualizarListaTripulaciones();
});

function actualizarListaTripulaciones() {
    const listaTripulacionesElement = document.getElementById('lista-tripulaciones');
    if (listaTripulacionesElement) {
        listaTripulacionesElement.innerHTML = '';
        listaTripulaciones.listarTripulaciones().forEach(tripulacion => {
            const li = document.createElement('li');
            li.textContent = `Tripulación ${tripulacion.idcodigo}`;
            listaTripulacionesElement.appendChild(li);
        });
    }
    const tripulacionBus = document.getElementById('tripulacionBus') as HTMLSelectElement;
    tripulacionBus.innerHTML = '';
    listaTripulaciones.listarTripulaciones().forEach(tripulacion => {
        const option = document.createElement('option');
        option.value = tripulacion.idcodigo;
        option.text = `Tripulación ${tripulacion.idcodigo}`;
        tripulacionBus.appendChild(option);
    });
    const tripulacionViaje = document.getElementById('tripulacionViaje') as HTMLSelectElement;
    tripulacionViaje.innerHTML = '';
    listaTripulaciones.listarTripulaciones().forEach(tripulacion => {
        const option = document.createElement('option');
        option.value = tripulacion.idcodigo;
        option.text = `Tripulación ${tripulacion.idcodigo}`;
        tripulacionViaje.appendChild(option);
    });
}

document.getElementById('form-bus')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const codigo = (document.getElementById('codigoBus') as HTMLInputElement).value;
    const placa = (document.getElementById('placa') as HTMLInputElement).value;
    const tipo = (document.getElementById('tipo') as HTMLInputElement).value;
    const enMantenimiento = (document.getElementById('enMantenimiento') as HTMLInputElement).checked;
    const tripulacionCodigo = (document.getElementById('tripulacionBus') as HTMLSelectElement).value;
    const tripulacion = listaTripulaciones.listarTripulaciones().find(t => t.idcodigo === tripulacionCodigo);

    const nuevoBus = new Bus(codigo, placa, tipo, enMantenimiento);
    if (tripulacion) {
        nuevoBus.Tripulacion.push(tripulacion);
    }
    listaBuses.Insertar(nuevoBus);
    actualizarListaBuses();
});


function actualizarListaBuses() {
    const tablaBusesElement = document.getElementById('tabla-buses');
    if (tablaBusesElement) {
        const tbody = tablaBusesElement.getElementsByTagName('tbody')[0];
        if (tbody) {
            tbody.innerHTML = '';
            listaBuses.listarBuses().forEach(bus => {
                const row = document.createElement('tr');

                const cellCodigo = document.createElement('td');
                cellCodigo.textContent = bus.codigobuses;
                row.appendChild(cellCodigo);

                const cellPlaca = document.createElement('td');
                cellPlaca.textContent = bus.placa;
                row.appendChild(cellPlaca);

                const cellTipo = document.createElement('td');
                cellTipo.textContent = bus.tipo;
                row.appendChild(cellTipo);

                const cellMantenimiento = document.createElement('td');
                cellMantenimiento.textContent = bus.mantenimiento ? 'Sí' : 'No';
                row.appendChild(cellMantenimiento);

                const cellTripulacion = document.createElement('td');
                cellTripulacion.textContent = bus.Tripulacion.map(t => t.idcodigo).join(', ');
                row.appendChild(cellTripulacion);

                tbody.appendChild(row);
            });
        }
    }
    // Actualizar la lista de buses en el formulario de viajes
    actualizarListaBusesViaje();
}

// Llamar a actualizarListaBusesViaje cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarListaBuses();
});

// Llamar a actualizarListaBusesViaje cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarListaBusesViaje();
});


document.getElementById('form-viaje')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const codigo = (document.getElementById('codigoViaje') as HTMLInputElement).value;
    const origen = (document.getElementById('origen') as HTMLInputElement).value;
    const destino = (document.getElementById('destino') as HTMLInputElement).value;
    const fechaHoraSalida = (document.getElementById('fechaHoraSalida') as HTMLInputElement).value;
    const fechaHoraLlegada = (document.getElementById('fechaHoraLlegada') as HTMLInputElement).value;
    const busCodigo = (document.getElementById('busViaje') as HTMLSelectElement).value;
    const tripulacionCodigo = (document.getElementById('tripulacionViaje') as HTMLSelectElement).value;

    // Buscar el bus seleccionado en la lista de buses
    const busSeleccionado = listaBuses.listarBuses().find(bus => bus.codigobuses === busCodigo);

    // Verificar si el bus está en mantenimiento
    if (busSeleccionado && busSeleccionado.mantenimiento) {
        // Si el bus está en mantenimiento, mostrar mensaje y detener la creación del viaje
        alert("El bus seleccionado está en mantenimiento. No se puede realizar el viaje.");
        return; // Detener la ejecución del código
    }

    // Comprobar si estamos en modo de edición
    const codigoViajeEditar = (document.getElementById('codigoViajeEditar') as HTMLInputElement).value;

    if (codigoViajeEditar) {
        // Editar el viaje existente
        const viajeModificado = new Viaje(codigoViajeEditar, origen, destino, fechaHoraSalida, fechaHoraLlegada, 'en curso');
        viajeModificado.bus.push(busSeleccionado!);
        viajeModificado.tripulacion.push(listaTripulaciones.listarTripulaciones().find(t => t.idcodigo === tripulacionCodigo)!);
        listaViajes.ModificarViaje(codigoViajeEditar, viajeModificado);
    } else {
        // Crear un nuevo viaje
        const nuevoViaje = new Viaje(codigo, origen, destino, fechaHoraSalida, fechaHoraLlegada, 'en curso');
        nuevoViaje.bus.push(busSeleccionado!);
        nuevoViaje.tripulacion.push(listaTripulaciones.listarTripulaciones().find(t => t.idcodigo === tripulacionCodigo)!);
        listaViajes.Insertar(nuevoViaje);
    }

    actualizarListaViajes();
    // Limpiar el formulario y el campo oculto
    (document.getElementById('form-viaje') as HTMLFormElement).reset();
    (document.getElementById('codigoViajeEditar') as HTMLInputElement).value = '';
});

function actualizarListaViajes() {
    const listaViajesElement = document.getElementById('lista-viajes');
    if (listaViajesElement) {
        listaViajesElement.innerHTML = '';
        listaViajes.listarViajes().forEach(viaje => {
            const row = document.createElement('tr');

            const cellCodigo = document.createElement('td');
            cellCodigo.textContent = viaje.codigo;
            row.appendChild(cellCodigo);

            const cellOrigen = document.createElement('td');
            cellOrigen.textContent = viaje.origen;
            row.appendChild(cellOrigen);

            const cellDestino = document.createElement('td');
            cellDestino.textContent = viaje.destino;
            row.appendChild(cellDestino);

            const cellFechaHoraSalida = document.createElement('td');
            cellFechaHoraSalida.textContent = viaje.fechahorasalida;
            row.appendChild(cellFechaHoraSalida);

            const cellFechaHoraLlegada = document.createElement('td');
            cellFechaHoraLlegada.textContent = viaje.fechahorallegada;
            row.appendChild(cellFechaHoraLlegada);

            const cellEstado = document.createElement('td');
            cellEstado.textContent = viaje.estado;
            row.appendChild(cellEstado);

            const cellAcciones = document.createElement('td');
            
            // Botón para cambiar estado del viaje
            const buttonCambiarEstado = document.createElement('button');
            buttonCambiarEstado.textContent = 'Cambiar Estado';
            buttonCambiarEstado.classList.add('cambiar-estado-btn');
            buttonCambiarEstado.addEventListener('click', function () {
                cambiarEstadoViaje(viaje.codigo);
            });
            cellAcciones.appendChild(buttonCambiarEstado);
            
            // Botón para editar viaje
            const buttonEditarViaje = document.createElement('button');
            buttonEditarViaje.textContent = 'Editar';
            buttonEditarViaje.classList.add('btn-editar-viaje');
            buttonEditarViaje.setAttribute('data-codigo', viaje.codigo);
            buttonEditarViaje.addEventListener('click', function () {
                // Aquí deberías tener la lógica para editar el viaje
            });
            cellAcciones.appendChild(buttonEditarViaje);
            
            // Botón para eliminar viaje
            const buttonEliminarViaje = document.createElement('button');
            buttonEliminarViaje.textContent = 'Eliminar';
            buttonEliminarViaje.classList.add('btn-eliminar-viaje');
            buttonEliminarViaje.setAttribute('data-codigo', viaje.codigo);
            buttonEliminarViaje.addEventListener('click', function () {
                // Aquí deberías tener la lógica para eliminar el viaje
            });
            cellAcciones.appendChild(buttonEliminarViaje);
            
            row.appendChild(cellAcciones);

            listaViajesElement.appendChild(row);
        });
    }
}


function cambiarEstadoViaje(codigoViaje: string): void {
    listaViajes.cambiarEstadoViaje(codigoViaje);
    actualizarListaViajes(); // Actualiza la lista de viajes después de cambiar el estado
}

document.getElementById('consultarViajesPorBus')?.addEventListener('click', function () {
    const codigoBus = (document.getElementById('codigoBusConsultar') as HTMLInputElement).value;
    const cantidadViajes = listaViajes.cantidadViajesPorBus(codigoBus);
    const resultadoViajesPorBus = document.getElementById('resultadoViajesPorBus');
    if (resultadoViajesPorBus) {
        resultadoViajesPorBus.textContent = `Cantidad de viajes realizados por el bus ${codigoBus}: ${cantidadViajes}`;
    }
});

document.getElementById('consultarPromedioViajes')?.addEventListener('click', function () {
    const promedioViajes = listaViajes.promedioViajesPorBus();
    const resultadoPromedioViajes = document.getElementById('resultadoPromedioViajes');
    if (resultadoPromedioViajes) {
        resultadoPromedioViajes.textContent = `Promedio de viajes realizados por cada bus: ${promedioViajes}`;
    }
});

document.addEventListener('click', function (event) {
    if (event.target && (event.target as HTMLElement).classList.contains('btn-editar-viaje')) {
        const codigoViaje = (event.target as HTMLElement).getAttribute('data-codigo');
        const viaje = listaViajes.listarViajes().find(v => v.codigo === codigoViaje);

        if (viaje) {
            // Rellenar el formulario con los detalles del viaje
            (document.getElementById('codigoViaje') as HTMLInputElement).value = viaje.codigo;
            (document.getElementById('origen') as HTMLInputElement).value = viaje.origen;
            (document.getElementById('destino') as HTMLInputElement).value = viaje.destino;
            (document.getElementById('fechaHoraSalida') as HTMLInputElement).value = viaje.fechahorasalida;
            (document.getElementById('fechaHoraLlegada') as HTMLInputElement).value = viaje.fechahorallegada;

            // Establecer el valor del campo oculto
            (document.getElementById('codigoViajeEditar') as HTMLInputElement).value = viaje.codigo;

            // Ocultar el botón de registro y mostrar el botón de editar
            (document.getElementById('registrarViajeBtn') as HTMLButtonElement).style.display = 'none';
            (document.getElementById('editarViajeBtn') as HTMLButtonElement).style.display = 'inline-block';
        }
    }

    if (event.target && (event.target as HTMLElement).classList.contains('btn-eliminar-viaje')) {
        const codigoViaje = (event.target as HTMLElement).getAttribute('data-codigo');
        if (codigoViaje) { // Añadir esta comprobación de nulidad
            const confirmacion = confirm('¿Estás seguro de que deseas eliminar este viaje?');

            if (confirmacion) {
                listaViajes.EliminarPorCodigo(codigoViaje);
                actualizarListaViajes();
            }
        }
    }
});

// Agregar esta función para manejar la edición de viajes
document.getElementById('editarViajeBtn')?.addEventListener('click', function (event) {
    event.preventDefault();
    const codigoViaje = (document.getElementById('codigoViajeEditar') as HTMLInputElement).value;
    if (codigoViaje) {
        const origen = (document.getElementById('origen') as HTMLInputElement).value;
        const destino = (document.getElementById('destino') as HTMLInputElement).value;
        const fechaHoraSalida = (document.getElementById('fechaHoraSalida') as HTMLInputElement).value;
        const fechaHoraLlegada = (document.getElementById('fechaHoraLlegada') as HTMLInputElement).value;

        // Buscar el viaje en la lista de viajes y modificar sus datos
        const viajeModificado = new Viaje(codigoViaje, origen, destino, fechaHoraSalida, fechaHoraLlegada, 'en curso');
        listaViajes.ModificarViaje(codigoViaje, viajeModificado);

        // Limpiar el formulario y mostrar el botón de registro nuevamente
        (document.getElementById('form-viaje') as HTMLFormElement).reset();
        (document.getElementById('registrarViajeBtn') as HTMLButtonElement).style.display = 'inline-block';
        (document.getElementById('editarViajeBtn') as HTMLButtonElement).style.display = 'none';

        // Limpiar el campo oculto
        (document.getElementById('codigoViajeEditar') as HTMLInputElement).value = '';

        // Actualizar la lista de viajes
        actualizarListaViajes();
    }
});


// Función para abrir el modal y actualizar la lista de tripulaciones
function abrirModalTripulaciones() {
    const modal = document.getElementById('tripulacionesModal');
    const listaTripulacionesElement = document.getElementById('lista-tripulaciones-modal');

    if (modal && listaTripulacionesElement) {
        // Limpiar el contenido actual de la lista
        listaTripulacionesElement.innerHTML = '';

        // Iterar sobre la lista de tripulaciones y agregar elementos de lista
        listaTripulaciones.listarTripulaciones().forEach(tripulacion => {
            const li = document.createElement('li');
            li.textContent = `Tripulación ${tripulacion.idcodigo}`;
            listaTripulacionesElement.appendChild(li);
        });

        // Mostrar el modal
        modal.style.display = 'block';
    }
}

// Evento para cerrar el modal cuando se hace clic en el botón de cerrar
document.querySelector('.close')?.addEventListener('click', function() {
    const modal = document.getElementById('tripulacionesModal');
    if (modal) {
        modal.style.display = 'none';
    }
});



// Añadir evento de clic al botón de "Ver lista de tripulaciones"
document.getElementById('btn-ver-tripulaciones')?.addEventListener('click', abrirModalTripulaciones);
// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el botón de cerrar modal
    const closeModalButton = document.getElementById('closeModalButton') as HTMLButtonElement;
    // Selecciona el modal
    const modal = document.getElementById('tripulacionesModal') as HTMLElement;
    if (closeModalButton && modal) {
        // Añade el evento de clic al botón de cerrar modal
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Cierra el modal
        });
    }
    document.querySelector('.close')?.addEventListener('click', function() {
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

function actualizarListaBusesViaje() {
    const busViaje = document.getElementById('busViaje') as HTMLSelectElement;
    busViaje.innerHTML = ''; // Limpiar las opciones actuales

    listaBuses.listarBuses().forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.codigobuses;
        option.text = `${bus.codigobuses} - ${bus.placa}`;
        busViaje.appendChild(option);
    });
}



