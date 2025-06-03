require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const contaRoutes = require('./routes/contaRoutes');
app.use('/api/contas', contaRoutes);

const operacoesRoutes = require('./routes/operacoesRoutes');
app.use('/api/operacoes', operacoesRoutes);
