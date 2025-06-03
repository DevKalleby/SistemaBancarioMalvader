const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmail(destinatario, assunto, mensagem) {
  await transporter.sendMail({
    from: `"Sistema Bancário" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: assunto,
    text: mensagem,
  });
}

module.exports = enviarEmail;
