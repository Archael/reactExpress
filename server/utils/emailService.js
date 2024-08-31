const nodemailer = require('nodemailer');
const Message = require('../models/Message');

let transporter;

async function createTransporter() {
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER || testAccount.user,
      pass: process.env.ETHEREAL_PASS || testAccount.pass,
    },
  });
}

exports.sendPendingMessages = async () => {
  if (!transporter) {
    transporter = await createTransporter();
  }

  const pendingMessages = await Message.findPendingMessages();

  if (pendingMessages.length === 0) {
    return;
  }

  const messageBody = pendingMessages
    .map(
      (msg) =>
        `Username: ${msg.username}\nAddress: ${msg.address}\nMessage: ${msg.message}\n\n`
    )
    .join('');

  const mailOptions = {
    from: 'do_not_reply@northpole.com',
    to: 'santa@northpole.com',
    subject: 'Pending Santa Messages',
    text: messageBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Mark messages as sent
    await Message.markAsSent(pendingMessages.map((msg) => msg.childId));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
