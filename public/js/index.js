const btnAgregar = document.getElementById('btnAgregar');
const btnCargar = document.getElementById('btnCargar');
const tablaSolicitudesBody = document.getElementById('tablaSolicitudesBody');
const mensaje = document.getElementById('mensaje');
const filtroTipo = document.getElementById('filtroTipo');
const filtroPrioridad = document.getElementById('filtroPrioridad');
const filtroBusqueda = document.getElementById('filtroBusqueda');
let solicitudes = [];

// -------------------------
// BOTONES PRINCIPALES
// -------------------------
btnAgregar.addEventListener('click', () => {
  window.location.href = 'formulario.html';
});

btnCargar.addEventListener('click', cargarSolicitudes);

// -------------------------
// INIT
// -------------------------
document.addEventListener('DOMContentLoaded', async () => {
  await cargarSolicitudes();
});

// -------------------------
// CLICK GLOBAL (EDITAR / ELIMINAR)
// -------------------------
document.addEventListener('click', async (e) => {

  if (e.target.classList.contains('btn-eliminar')) {
    await eliminarSolicitud(e.target.dataset.id);
  }

  if (e.target.classList.contains('btn-actualizar')) {
    window.location.href = `formulario.html?id=${e.target.dataset.id}`;
  }

});

filtroTipo.addEventListener(
  'change',
  aplicarFiltros
);


filtroPrioridad.addEventListener(
  'change',
  aplicarFiltros
);

filtroBusqueda.addEventListener(
  'input',
  aplicarFiltros
);

// -------------------------
// CARGAR SOLICITUDES
// -------------------------
async function cargarSolicitudes() {

  mensaje.innerHTML = '';

  try {

    const response = await fetch('/api/solicitudes');
    const data = await response.json();

    if (!data.ok || data.data.length === 0) {

      tablaSolicitudesBody.innerHTML = `
        <tr>
          <td colspan="11">No hay solicitudes registradas.</td>
        </tr>
      `;

      return;
    }

    solicitudes = data.data;
    mostrarSolicitudes(solicitudes);

  } catch (error) {

    tablaSolicitudesBody.innerHTML = `

      <tr>
        <td colspan="11">
          Error al cargar las solicitudes.
        </td>
      </tr>

    `;
  }
}

function mostrarSolicitudes(lista) {


  if (!lista || lista.length === 0) {

    tablaSolicitudesBody.innerHTML = `
      <tr>
        <td colspan="9">
          No hay solicitudes registradas.
        </td>
      </tr>
    `;

    return;
  }

  tablaSolicitudesBody.innerHTML = lista.map(solicitud => `

    <tr>

      <td>${solicitud.id}</td>
      <td>${solicitud.nombreEstudiante}</td>
      <td>${solicitud.correo}</td>
      <td>${solicitud.asignatura}</td>
      <td>${solicitud.tipo}</td>
      <td>${solicitud.descripcion}</td>
      <td>${solicitud.prioridad}</td>
      <td>${new Date(solicitud.fechaIngreso).toLocaleString('es-CL')}</td>
      <td>
        <button
          class="btn-accion btn-actualizar"
          data-id="${solicitud.id}">
          Actualizar
        </button>

        <button
          class="btn-accion btn-eliminar btn-peligro"
          data-id="${solicitud.id}">
          Eliminar
        </button>
      </td>
    </tr>
  `).join('');
}

// -------------------------
// ELIMINAR SOLICITUD
// -------------------------
async function eliminarSolicitud(id) {

  if (!confirm('¿Desea eliminar esta solicitud?')) {
    return;
  }
  try {

    const response = await fetch(`/api/solicitudes/${id}`, {

      method: 'DELETE'
    });

    const data = await response.json();

    if (data.ok) {

      mensaje.innerHTML = `
        <p class="exito">
          ${data.mensaje}
        </p>
      `;

      await cargarSolicitudes();

    } else {

      mensaje.innerHTML = `
        <p class="error">
          ${data.mensaje}
        </p>
      `;

    }

  } catch (error) {

    mensaje.innerHTML = `
      <p class="error">
        Error al eliminar la solicitud.
      </p>
    `;
  }
}

function aplicarFiltros() {

  const tipo = filtroTipo.value;
  const prioridad = filtroPrioridad.value;
  const texto = filtroBusqueda.value.toLowerCase();

  const resultado = solicitudes.filter(solicitud => {

    const coincideTipo =
      !tipo || solicitud.tipo === tipo;

    const coincidePrioridad =
      !prioridad || solicitud.prioridad === prioridad;

    const coincideTexto =
      !texto ||
      solicitud.nombreEstudiante.toLowerCase().includes(texto) ||
      solicitud.asignatura.toLowerCase().includes(texto);

    return (
      coincideTipo &&
      coincidePrioridad &&
      coincideTexto
    );
  });

  mostrarSolicitudes(resultado);

}

// -------------------------
// FORMATO FECHA
// -------------------------
function formatearFecha(fechaISO) {

  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}