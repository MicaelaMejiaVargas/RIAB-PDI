const express = require('express');
const router = express.Router();

//importamos el controlador
const resController = require('../controladores/rescatistasControlador')

router.get('/', resController.obtenerTodos);
router.get('/:dni', resController.obtener);
router.post('/', resController.crear);
router.put('/:dni', resController.actualizar);
router.delete('/:dni', resController.borrar);

module.exports = router