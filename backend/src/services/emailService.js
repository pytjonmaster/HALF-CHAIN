const transporter = require('../config/email');
const { getVerificationEmailTemplate, getPasswordResetTemplate } = require('../utils/emailTemplates');

class EmailService {
  static async sendVerificationEmail(email, name, token) {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    const html = getVerificationEmailTemplate(name, verificationLink);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email',
      html
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  static async sendPasswordResetEmail(email, name, token) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const html = getPasswordResetTemplate(name, resetLink);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }
}

module.exports = EmailService; 