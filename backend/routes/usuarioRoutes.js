const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/verificar-otp', usuarioController.verificarOtp);


module.exports = router;
