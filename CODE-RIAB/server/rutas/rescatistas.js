const express = require('express');
const router = express.Router();

//importamos el controlador
const resController = require('../controladores/rescatistasControlador');
const autorizar = require('../middlewares/autorizar');

router.get('/',autorizar.soloRescatistas, resController.obtenerTodos);
router.get('/:codigo_r',autorizar.soloRescatistas, resController.obtener);
router.put('/:dni',autorizar.soloRescatistas, resController.actualizar);
router.delete('/:dni',autorizar.soloRescatistas, resController.borrar);

router.post('/registro', resController.crear);
router.post('/login',resController.login);

module.exports = router