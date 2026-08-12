// backend/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendPasswordResetEmail = async (email, resetToken, userName = 'User') => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - Belkids',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4A90E2; text-align: center;">Password Reset Request</h2>
          <p>Hello ${userName},</p>
          <p>We received a request to reset your password for your Belkids account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4A90E2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support.</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = { sendPasswordResetEmail };