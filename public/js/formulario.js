const formSolicitud = document.getElementById('formSolicitud');
const mensaje = document.getElementById('mensaje');
const btnVolver = document.getElementById('btnVolver');
const tituloFormulario = document.getElementById('tituloFormulario');
const btnGuardar = document.getElementById('btnGuardar');

const parametros = new URLSearchParams(window.location.search);
const solicitudId = parametros.get('id');

const modoEdicion = solicitudId !== null;

// volver al listado
btnVolver.addEventListener('click', () => {
  window.location.href = '/';
});

// inicio
document.addEventListener('DOMContentLoaded', async () => {

  if (modoEdicion) {

    tituloFormulario.textContent = 'Actualizar Solicitud';
    btnGuardar.textContent = 'Actualizar';

    await cargarSolicitudParaEditar(solicitudId);
  }
});

// -------------------------
// SUBMIT FORM
// -------------------------
formSolicitud.addEventListener('submit', async (e) => {

  e.preventDefault();

  const nombreEstudiante = document.getElementById('nombreEstudiante').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const asignatura = document.getElementById('asignatura').value.trim();
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value.trim();
  const prioridad = document.getElementById('prioridad').value;

  if (
    !nombreEstudiante ||
    !correo ||
    !asignatura ||
    !tipo ||
    !descripcion ||
    !prioridad 
  ) {

    mensaje.innerHTML =
      '<p class="error">Campos obligatorios incompletos.</p>';

    return;
  }

  const payload = {
    nombreEstudiante,
    correo,
    asignatura,
    tipo,
    descripcion,
    prioridad
  };

  const url = modoEdicion
    ? `/api/solicitudes/${solicitudId}`
    : '/api/solicitudes';

  const metodo = modoEdicion
    ? 'PUT'
    : 'POST';

  try {

    const response = await fetch(url, {

      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(payload)

    });

    const data = await response.json();

    if (data.ok) {

      mensaje.innerHTML = `<p class="exito">${data.mensaje}</p>`;

      if (!modoEdicion) {
        formSolicitud.reset();
      }

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } else {

      mensaje.innerHTML = `<p class="error">${data.mensaje}</p>`;
    }

  } catch (error) {

    mensaje.innerHTML =
      '<p class="error">Error de conexión con el servidor.</p>';
  }
});

// -------------------------
// CARGAR SOLICITUD PARA EDITAR
// -------------------------
async function cargarSolicitudParaEditar(id) {

  try {

    const response = await fetch(`/api/solicitudes/${id}`);
    const data = await response.json();

    if (!data.ok) {

      mensaje.innerHTML = `<p class="error">${data.mensaje}</p>`;
      formSolicitud.style.display = 'none';

      return;
    }

    const s = data.data;

    document.getElementById('nombreEstudiante').value = s.nombreEstudiante;
    document.getElementById('correo').value = s.correo;
    document.getElementById('asignatura').value = s.asignatura;
    document.getElementById('tipo').value = s.tipo;
    document.getElementById('descripcion').value = s.descripcion;
    document.getElementById('prioridad').value = s.prioridad;

  } catch (error) {

    mensaje.innerHTML = '<p class="error">Error al cargar la solicitud.</p>';
    formSolicitud.style.display = 'none';
  }
}