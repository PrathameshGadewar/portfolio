import nodemailer from 'nodemailer';

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Portfolio Admin" <noreply@portfolio.com>`;

  if (!host || !user || !pass) {
    console.log('\n========================================');
    console.log(`⚠️  SMTP is not configured!`);
    console.log(`✉️  [FALLBACK] Generated OTP for ${email}: ${otp}`);
    console.log('========================================\n');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Your Admin OTP Code',
      text: `Your Admin portal verification code is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #4A6FA5; margin-top: 0;">Admin Access Verification</h2>
          <p>You requested access to the Admin Portal. Please use the following One-Time Password (OTP) to complete your sign-in:</p>
          <div style="background-color: #f5f5f5; padding: 16px; text-align: center; border-radius: 6px; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1a1a2e; margin: 24px 0;">
            ${otp}
          </div>
          <p style="font-size: 13px; color: #666; margin-bottom: 0;">This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`✅ OTP email successfully sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send OTP email via SMTP:', error);
    console.log('\n========================================');
    console.log(`✉️  [FALLBACK] Generated OTP for ${email}: ${otp}`);
    console.log('========================================\n');
    return false;
  }
}
