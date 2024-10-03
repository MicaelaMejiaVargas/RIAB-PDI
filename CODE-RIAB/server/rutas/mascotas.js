const express = require('express');
const router = express.Router();

// Importamos controlador
const controladorMascota = require('../controladores/mascotasControlador');

// Definición de rutas
router.get('/', controladorMascota.obtenerMascotas);
router.get('/:id', controladorMascota.obtenerMascotasId);
router.post('/registro', controladorMascota.crearMascotas); // Cambiado a la raíz para crear mascotas
router.put('/:id', controladorMascota.actualizarMascotas);
router.delete('/:id', controladorMascota.borrarMascotas);

module.exports = router;
