const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

router.post('/abrir', contaController.abrirConta);
router.get('/usuario/:usuarioId', contaController.listarContas);

module.exports = router;
