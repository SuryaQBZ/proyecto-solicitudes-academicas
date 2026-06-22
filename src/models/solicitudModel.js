const pool = require('../config/db');

async function insertarSolicitud(solicitud) {
  const sql = `
    INSERT INTO solicitud (nombreEstudiante, correo, asignatura, tipo, descripcion, prioridad)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    solicitud.nombreEstudiante,
    solicitud.correo,
    solicitud.asignatura,
    solicitud.tipo,
    solicitud.descripcion,
    solicitud.prioridad,
  ];

  const [result] = await pool.execute(sql, values);
  return result;
}

async function obtenerTodasLasSolicitudes() {
  const sql = `
    SELECT id, nombreEstudiante, correo, asignatura, tipo, descripcion, prioridad, fechaIngreso
    FROM solicitud
    ORDER BY id DESC
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, nombreEstudiante, correo, asignatura, tipo, descripcion, prioridad, fechaIngreso 
    FROM solicitud
    WHERE id = ?
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}

async function actualizarSolicitud(id, solicitud) {
  const sql = `
    UPDATE solicitud
    SET nombreEstudiante = ?, correo = ?, asignatura = ?, tipo = ?, descripcion = ?, prioridad = ?
    WHERE id = ?
  `;

  const values = [
    solicitud.nombreEstudiante,
    solicitud.correo,
    solicitud.asignatura,
    solicitud.tipo,
    solicitud.descripcion,
    solicitud.prioridad,
    id
  ];

  const [result] = await pool.execute(sql, values);
  return result;
}

async function eliminarSolicitud(id) {
  const sql = 'DELETE FROM solicitud WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result;
}

module.exports = {
  insertarSolicitud,
  obtenerTodasLasSolicitudes,
  buscarPorId,
  actualizarSolicitud,
  eliminarSolicitud
};
