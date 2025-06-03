const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');
const enviarEmail = require('../utils/email');
const otps = {};

async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const usuarioExistente = await usuarioModel.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const id = await usuarioModel.criarUsuario(nome, email, senhaCriptografada, tipo);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login válido. Verifique o OTP.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }


async function loginUsuario(req, res) {
  const { email, senha } = req.body;
  const usuario = await usuarioModel.buscarPorEmail(email);

  if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas' });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(401).json({ error: 'Credenciais inválidas' });

  // Gerar OTP e salvar temporariamente
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  otps[email] = { codigo: otp, expira: Date.now() + 5 * 60 * 1000 }; // 5 minutos

  await enviarEmail(email, 'Seu código OTP', `Seu código OTP é: ${otp}`);

  res.json({ message: 'Login válido. Verifique o OTP enviado para seu email.' });
}

}

async function verificarOtp(req, res) {
  const { email, codigo } = req.body;

  const registro = otps[email];
  if (!registro) return res.status(400).json({ error: 'Código expirado ou inválido' });

  if (registro.codigo !== codigo) return res.status(401).json({ error: 'Código incorreto' });

  if (Date.now() > registro.expira) {
    delete otps[email];
    return res.status(401).json({ error: 'Código expirado' });
  }

  delete otps[email];
  res.json({ message: 'OTP verificado com sucesso! Acesso liberado.' });
}



module.exports = {
  cadastrarUsuario,
  loginUsuario,
  verificarOtp
};
