const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

router.get('/', docenteController.listarDocentes);
router.post('/', docenteController.crearDocente);
router.put('/:id', docenteController.actualizarDocente);
router.delete('/:id', docenteController.eliminarDocente);

module.exports = router;