const express = require('express');
const router = express.Router();
const operacoesController = require('../controllers/operacoesController');

router.post('/depositar', operacoesController.depositar);
router.post('/sacar', operacoesController.sacar);
router.post('/transferir', operacoesController.transferir);

module.exports = router;
