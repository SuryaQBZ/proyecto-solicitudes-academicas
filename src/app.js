const express = require('express');
const cors = require('cors');
require('dotenv').config();

const solicitudRoutes = require('./routes/solicitudRoutes');
const logger = require('./middlewares/logger.middleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(express.static('public'));

app.use('/api', solicitudRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada.'
  });
});

app.use((error, req, res, next) => {
  console.error('[ERROR]', error);
  res.status(500).json({
    ok: false,
    mensaje: 'Error interno del servidor.'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});