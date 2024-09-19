const express = require('express');
const router = express.Router();

const path = require('path');
router.use(express.static(path.join(__dirname, '../client')));

//importamos el controlador
const resController = require('../controladores/rescatistasControlador');
const autorizar = require('../middlewares/autorizar');

/**rutas con middleware */
// router.get('/',autorizar.soloRescatistas, resController.obtenerTodos);
// router.get('/:codigo_r',autorizar.soloRescatistas, resController.obtener);
// router.put('/:dni',autorizar.soloRescatistas, resController.actualizar);
// router.delete('/:dni',autorizar.soloRescatistas, resController.borrar);

// router.post('/registro', resController.crear);
// router.post('/login',resController.login);

router.get('/', resController.obtenerTodos);
router.get('/:codigo_r', resController.obtener);
router.put('/:dni', resController.actualizar);
router.delete('/:dni', resController.borrar);

router.post('/registro', resController.crear);
router.post('/login',resController.login);

router.get('/admin',(req, res) => res.sendFile(path.join(__dirname + "../client/rescatista-pages/index_rescatistas.html")));

module.exports = router