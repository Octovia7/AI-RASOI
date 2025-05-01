// utils/sendEmailOTP.js
const nodemailer = require("nodemailer");

const sendEmailOTP = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"AI-RASOI" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🔐 Verify Your Email - AI-RASOI OTP",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; border-radius: 8px; color: #333;">
        <h2 style="color: #e63946;">AI-RASOI Email Verification</h2>
        <p>Hello,</p>
        <p>Thank you for signing up! Please use the following One-Time Password (OTP) to verify your email address:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 16px 0; color: #1d3557;">${otp}</div>
        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">AI-RASOI Team<br />Connecting Food with Technology</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailOTP;
