const express = require('express');
const router = express.Router();

//importamos el controlador
const resController = require('../controllers/rescatistasController');

//importamos middleware
const autorizar = require('../middlewares/auth');

/**rutas con middleware */
router.get('/',autorizar.verificacion, resController.obtenerTodos);
router.get('/:dni', resController.obtener);
// router.put('/:dni', autorizar, resController.actualizar);
// router.delete('/:dni', autorizar, resController.borrar);
router.post('/registro', resController.crear);

// router.post('/login', resController.login);
// router.post("/logout", autorizar, resController.logout);

module.exports = router