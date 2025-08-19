// Import nodemailer to send emails
const nodemailer = require("nodemailer");

// Function to send an email
const sendEmail = async (options) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    // Use Gmail as the email service
    service: "gmail",
    // SMTP host (from environment variables)
    host: process.env.SMTP_HOST,
    // Do not use SSL/TLS by default
    secure: false,
    // Authentication credentials for the SMTP server
    auth: {
      user: process.env.SMTP_FROM_EMAIL, // Sender email address
      pass: process.env.SMTP_PASSWORD,   // Sender email password or app-specific password
    },
  });

  // Define the email message details
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Sender name and email
    to: options.email,       // Recipient email
    subject: options.subject, // Email subject
    text: options.message,    // Email body (plain text)
  };

  // Send the email using the transporter
  await transporter.sendMail(message);
};

// Export the sendEmail function for use in other files
module.exports = sendEmail;
