const express = require('express');
const router = express.Router();

//importamos el controlador
const resController = require('./controllers/rescatistasController');

//importamos middleware
const autorizar = require('./middlewares/autorizar');

/**rutas con middleware */
router.get('/',autorizar, resController.obtenerTodos);
router.get('/:dni', resController.obtener);
router.put('/:dni',autorizar, resController.actualizar);
router.delete('/:dni',autorizar.soloRescatistas, resController.borrar);
// router.post('/registro', resController.crear);

router.post('/login',resController.login);
router.post("/logout", autorizar, resController.logout);

module.exports = router