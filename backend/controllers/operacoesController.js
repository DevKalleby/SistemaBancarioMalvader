const contaModel = require('../models/contaModel');

async function depositar(req, res) {
  const { contaId, valor } = req.body;
  if (!contaId || !valor) return res.status(400).json({ error: 'Dados inválidos' });

  try {
    const novoSaldo = await contaModel.atualizarSaldoPorOperacao(contaId, valor, 'deposito');
    res.json({ message: 'Depósito realizado', saldo: novoSaldo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function sacar(req, res) {
  const { contaId, valor } = req.body;
  if (!contaId || !valor) return res.status(400).json({ error: 'Dados inválidos' });

  try {
    const novoSaldo = await contaModel.atualizarSaldoPorOperacao(contaId, valor, 'saque');
    res.json({ message: 'Saque realizado', saldo: novoSaldo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function transferir(req, res) {
  const { origemId, destinoId, valor } = req.body;
  if (!origemId || !destinoId || !valor)
    return res.status(400).json({ error: 'Dados incompletos' });

  try {
    await contaModel.atualizarSaldoPorOperacao(origemId, valor, 'saque');
    await contaModel.atualizarSaldoPorOperacao(destinoId, valor, 'deposito');
    res.json({ message: 'Transferência realizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { depositar, sacar, transferir };
