const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');

// Confuguración de los middlewares
app.use(
    cors({
      credentials: true,
    //   origin: "https://",
      methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
    })
  );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("client", {extensions: ["html", "css", "js"]}));

// CONECTAMOS LAS RUTAS:
const rescatistas = require('./rutas/rescatistas');
// const mascotas = require('./rutas/mascotas');
// const personas = require('./rutas/personas');
// const historial = require('./rutas/historial');

// Ruta RESCATISTAS (Sol :D)
app.use('/rescatistas', rescatistas);
// Ruta MASCOTAS (Mica :D)
// app.use('/mascotas', mascotas);
// // Ruta PERSONAS (Sol :D)
// app.use('/personas', personas);
// // Ruta HISTORIAL MEDICO (Cande :D)
// app.use('/historial', historial);

// Ruta INICIO
app.get('/', (req, res) => {
  res.send('Bienvenidos al inicio de la página RIAB');
});

// Mensaje por consola de que todo anda joya
app.listen(process.env.PORT || 3000, () => {
  console.log(`Mi aplicacion esta funcionando en http://localhost:${process.env.PORT || 3000}`);
})
