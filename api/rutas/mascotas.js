const express = require('express');
const router = express.Router();

//Importamos controlador
const controladorMascota = require('../controladores/mascotasControlador')

//Importamos middleware
const verificarToken = require('../middleware/authToken');

// localhost:3000/mascotas/
router.get('/', verificarToken,controladorMascota.obtenerMascotas);
router.get("/obtenerId/:id", verificarToken, controladorMascota.obtenerMascotasId);
router.post('/registro', controladorMascota.crearMascotas);
router.put('/:id', verificarToken, controladorMascota.actualizarMascotas);
router.delete('/:id', verificarToken, controladorMascota.borrarMascotas);

module.exports = router