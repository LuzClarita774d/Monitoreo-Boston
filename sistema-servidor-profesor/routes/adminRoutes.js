const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/estaciones', adminController.getEstaciones);
router.post('/estaciones', adminController.addEstacion);
router.put('/estaciones/:id', adminController.updateEstacion);
router.delete('/estaciones/:id', adminController.deleteEstacion);

module.exports = router;