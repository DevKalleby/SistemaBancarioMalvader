const db = require('../database/connection');

async function criarConta(titular_id, tipo) {
  const [result] = await db.execute(
    'INSERT INTO contas (titular_id, tipo) VALUES (?, ?)',
    [titular_id, tipo]
  );
  return result.insertId;
}

async function buscarContasPorUsuario(usuarioId) {
  const [rows] = await db.execute(
    'SELECT * FROM contas WHERE titular_id = ? AND status = "ativa"',
    [usuarioId]
  );
  return rows;
}

async function atualizarSaldo(contaId, novoSaldo) {
  await db.execute(
    'UPDATE contas SET saldo = ? WHERE id = ?',
    [novoSaldo, contaId]
  );
}

async function encerrarConta(contaId) {
  await db.execute(
    'UPDATE contas SET status = "encerrada" WHERE id = ?',
    [contaId]
  );
}

async function buscarContaPorId(id) {
  const [rows] = await db.execute('SELECT * FROM contas WHERE id = ?', [id]);
  return rows[0];
}

async function atualizarSaldoPorOperacao(contaId, valor, operacao) {
  const conta = await buscarContaPorId(contaId);
  if (!conta) throw new Error('Conta não encontrada');

  const saldoAtual = parseFloat(conta.saldo);
  const valorOperacao = parseFloat(valor);

  let novoSaldo;

  if (operacao === 'deposito') {
    novoSaldo = saldoAtual + valorOperacao;
  } else if (operacao === 'saque') {
    novoSaldo = saldoAtual - valorOperacao;
    if (novoSaldo < 0) throw new Error('Saldo insuficiente');
  } else {
    throw new Error('Operação inválida');
  }

  // Arredondar para 2 casas decimais
  novoSaldo = parseFloat(novoSaldo.toFixed(2));

  await atualizarSaldo(contaId, novoSaldo);
  return novoSaldo;
}



module.exports = {
  criarConta,
  buscarContasPorUsuario,
  atualizarSaldo,
  encerrarConta,
  atualizarSaldoPorOperacao
};
