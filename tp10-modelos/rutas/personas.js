const express = require('express');
const router = express.Router()

//importamos controlador
const persController = require('../controladores/personasControlador')

router.get('/', persController.obtenerTodos);
router.post('/', persController.crear);
router.get('/:dni', persController.obtener);
router.put('/:dni', persController.actualizar);
router.delete('/:dni', persController.borrar);

module.exports = router