const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  if (!options.email) {
    throw new Error("No recipients defined");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
      user: process.env.SMPT_EMAIL, 
      pass: process.env.SMPT_PASSWORD, 
    },
  });

  const message = {
    from: `${process.env.SMPT_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}>`, 
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(message);    
    console.log(`📧 Email sent to ${options.email}`);
  } catch (error) {
    console.error(`❌ Email sending failed: ${error.message}`);
  }
};

module.exports = sendEmail;
