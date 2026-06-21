const solicitudService = require('../services/solicitudService');

async function agregarSolicitud(req, res) {
  try {
    const nuevaSolicitud = await solicitudService.crearSolicitud(req.body);

    res.status(201).json({
      ok: true,
      mensaje: 'Solicitud registrada correctamente.',
      data: nuevaSolicitud
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

async function listarSolicitudes(req, res) {
  try {
    const solicitudes = await solicitudService.listarSolicitudes();

    res.status(200).json({
      ok: true,
      data: solicitudes
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al listar solicitudes.'
    });
  }
}

async function obtenerSolicitudPorId(req, res) {
  try {
    const { id } = req.params;
    const solicitud = await solicitudService.obtenerSolicitudPorId(id);

    res.status(200).json({
      ok: true,
      data: solicitud
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      mensaje: error.message
    });
  }
}

async function actualizarSolicitud(req, res) {
  try {
    const { id } = req.params;
    const solicitudActualizada = await solicitudService.actualizarSolicitud(id, req.body);

    res.status(200).json({
      ok: true,
      mensaje: 'Solicitud actualizada correctamente.',
      data: solicitudActualizada
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

async function eliminarSolicitud(req, res) {
  try {
    const { id } = req.params;
    await solicitudService.eliminarSolicitud(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Solicitud eliminada correctamente.'
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
}

module.exports = {
  agregarSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  eliminarSolicitud
};