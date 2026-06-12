const express = require('express');
const router = express.Router();

const inventarioController = require('../controllers/inventarioController');

router.get('/', inventarioController.listarInventario);
router.get('/:id', inventarioController.obtenerEquipoPorId);
router.post('/', inventarioController.crearEquipo);
router.put('/:id', inventarioController.actualizarEquipo);
router.delete('/:id', inventarioController.eliminarEquipo);

module.exports = router;