const nodemailer = require('nodemailer');
const Message = require('../models/Message');

const transporter = nodemailer.createTransport({
  // Configure your email service here
});

exports.sendPendingMessages = async () => {
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
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    // Update messages as sent in the database
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
