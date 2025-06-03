const pool = require('../database/connection');

async function criarUsuario(nome, email, senhaCriptografada, tipo) {
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
    [nome, email, senhaCriptografada, tipo]
  );
  return result.insertId;
}

async function buscarPorEmail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = {
  criarUsuario,
  buscarPorEmail
};
