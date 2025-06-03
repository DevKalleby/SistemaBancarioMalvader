const contaModel = require('../models/contaModel');

async function abrirConta(req, res) {
  const { titular_id, tipo } = req.body;

  if (!titular_id || !tipo) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const id = await contaModel.criarConta(titular_id, tipo);
    res.status(201).json({ message: 'Conta criada com sucesso', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
}

async function listarContas(req, res) {
  const { usuarioId } = req.params;

  try {
    const contas = await contaModel.buscarContasPorUsuario(usuarioId);
    res.json(contas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contas' });
  }
}

module.exports = { abrirConta, listarContas };
