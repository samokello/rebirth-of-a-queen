const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM = 'no-reply@rebirthofaqueen.org'
} = process.env;

function createTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
}

async function sendBulkEmail({ subject, html, to }) {
  const transporter = createTransport();
  const info = await transporter.sendMail({ from: MAIL_FROM, bcc: to, subject, html });
  return info;
}

module.exports = { sendBulkEmail };


