const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.get('/solicitudes', solicitudController.listarSolicitudes);
router.get('/solicitudes/:id', solicitudController.obtenerSolicitudPorId);
router.post('/solicitudes', solicitudController.agregarSolicitud);
router.put('/solicitudes/:id', solicitudController.actualizarSolicitud);
router.delete('/solicitudes/:id', solicitudController.eliminarSolicitud);

module.exports = router;