const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Configuración de los middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("client", { extensions: ["html", "css", "js"] }));

// Conectamos las rutas
const rescatistas = require('./rutas/rescatistas');
const mascotas = require('./rutas/mascotas');
const personas = require('./rutas/personas');
const historial = require('./rutas/historial');

// Ruta RESCATISTAS
app.use('/rescatistas', rescatistas);

// Ruta MASCOTAS
app.use('/mascotas', mascotas);

// Ruta PERSONAS
app.use('/personas', personas);

// Ruta HISTORIAL MEDICO
app.use('/historial', historial);

// Ruta INICIO
app.get('/', (req, res) => {
  res.send('Bienvenidos al inicio de la página RIAB');
});

// Mensaje por consola de que todo anda bien
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mi aplicación está funcionando en http://localhost:${PORT}`);
});
