const express = require('express');
const router = express.Router();

// Importamos controlador
const controladorMascota = require('../controladores/mascotasControlador');

// Definición de rutas
// Obtener todas las mascotas
router.get('/', controladorMascota.obtenerMascotas);

// Obtener una mascota por ID
router.get('/:id', controladorMascota.obtenerMascotasId);

// Crear una nueva mascota
router.post('/', controladorMascota.crearMascotas); 

// Actualizar una mascota existente
router.put('/:id', controladorMascota.actualizarMascotas);

// Borrar una mascota
router.delete('/:id', controladorMascota.borrarMascotas);

// Exportar el router
module.exports = router;

