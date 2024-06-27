const express = require('express');
const router = express.Router();

//importamos controlador
const histoController = require('../controladores/histoControlador');

router.get('/', histoController.obtenerTodos);
router.get("/:id", histoController.obtener);
router.post('/', histoController.crear);
router.put('/:id', histoController.actualizar);
router.delete('/:id', histoController.borrar);

module.exports = router