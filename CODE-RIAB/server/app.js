const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CONECTAMOS LAS RUTAS:
//Ruta RESCATISTAS (Sol :D)
app.use('/rescatistas', require('./rutas/rescatistas'));
//Ruta MASCOTAS (Mica :D)
app.use('/mascotas', require('./rutas/mascotas'));
//Ruta PERSONAS (Sol :D)
app.use('/personas', require('./rutas/personas'));
//Ruta HISTORIAL MEDICO (Cande :D)
app.use('/historial', require('./rutas/historial'));

//Ruta INICIO de RIAB
app.get('/', (req, res) => {
  res.send('Bienvenidos al inicio de la página RIAB');
});

//Mensaje por consola de que todo anda joya
app.listen(3000, () => {
  console.log('Mi aplicacion esta funcionando en el puerto 3000!');
})
