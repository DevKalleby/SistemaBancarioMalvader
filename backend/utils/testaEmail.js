require('dotenv').config();
const enviarEmail = require('./email');

enviarEmail('seuemail@gmail.com', 'Teste de envio', 'Funcionou o envio de e-mail?')
  .then(() => {
    console.log('E-mail enviado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao enviar e-mail:', err);
  });
