const solicitudModel = require('../models/solicitudModel');


function validarEmail(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarTipo(tipo) {
  return [
    'Evaluacion',
    'Asistencia',
    'Contenidos',
    'Plataforma',
    'Otro'
  ].includes(tipo);
}

function validarPrioridad(prioridad) {
  return [
    'Baja',
    'Media',
    'Alta'
  ].includes(prioridad);
}

function validarCampos(solicitud) {
  const {
    nombreEstudiante,
    correo,
    asignatura,
    tipo,
    descripcion,
    prioridad,
    fechaIngreso
  } = solicitud;

  if (
    !nombreEstudiante ||
    !correo ||
    !asignatura ||
    !tipo ||
    !descripcion ||
    !prioridad ||
    !fechaIngreso
  ) {

    throw new Error('Campos obligatorios incompletos.');
  }

  if (!validarEmail(correo)) {

    throw new Error('Formato de correo inválido.');
  }

  if (!validarTipo(tipo)) {

    throw new Error('Tipo de solicitud inválido.');
  }

  if (!validarPrioridad(prioridad)) {

    throw new Error('Prioridad inválida.');
  }
}

async function crearSolicitud(solicitud) {

  validarCampos(solicitud);

  const nuevaSolicitud = {
    ...solicitud
  };

  const result = await solicitudModel.insertarSolicitud(nuevaSolicitud);
  return result;
}

async function listarSolicitudes() {

  return await solicitudModel.obtenerTodasLasSolicitudes();
}

async function obtenerSolicitudPorId(id) {

  const solicitud = await solicitudModel.buscarPorId(id);

  if (!solicitud) {

    throw new Error('Solicitud no encontrada');
  }

  return solicitud;
}

async function actualizarSolicitud(id, solicitud) {

  const existente = await solicitudModel.buscarPorId(id);

  if (!existente) {

    throw new Error('Solicitud no encontrada');
  }

  validarCampos(solicitud);

  await solicitudModel.actualizarSolicitud(
    id,
    solicitud
  );

  return solicitud;
}

async function eliminarSolicitud(id) {

  const existente = await solicitudModel.buscarPorId(id);

  if (!existente) {

    throw new Error('Solicitud no encontrada');
  }

  return await solicitudModel.eliminarSolicitud(id);
}

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  eliminarSolicitud
};