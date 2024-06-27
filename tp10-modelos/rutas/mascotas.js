const express = require('express');
const router = express.Router();

// Importamos controlador
const controladorMascota= require('../controladores/mascotasControlador')

// localhost:3000/mascotas/
router.get('/', controladorMascota.obtenerMascotas);
router.get("/:id", controladorMascota.obtenerMascotasId);
router.post('/', controladorMascota.crearMascotas);
router.put('/:id', controladorMascota.actualizarMascotas);
router.delete('/:id', controladorMascota.borrarMascotas);

module.exports = router