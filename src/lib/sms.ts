import twilio from 'twilio';

export async function sendOTPSMS(phone: string, otp: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  // Normalize phone number (ensure country code is present, e.g., +91 for India)
  let formattedPhone = phone.trim();
  if (!formattedPhone.startsWith('+')) {
    if (formattedPhone.length === 10) {
      formattedPhone = `+91${formattedPhone}`;
    } else {
      formattedPhone = `+${formattedPhone}`;
    }
  }

  if (!accountSid || !authToken || !twilioPhone) {
    console.log('\n========================================');
    console.log(`⚠️  Twilio is not configured!`);
    console.log(`📱  [FALLBACK] Generated OTP for SMS to ${formattedPhone}: ${otp}`);
    console.log('========================================\n');
    return false;
  }

  try {
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your Admin portal verification code is: ${otp}. It is valid for 10 minutes.`,
      from: twilioPhone,
      to: formattedPhone,
    });

    console.log(`✅ OTP SMS successfully sent to ${formattedPhone}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send OTP SMS via Twilio:', error);
    console.log('\n========================================');
    console.log(`📱  [FALLBACK] Generated OTP for SMS to ${formattedPhone}: ${otp}`);
    console.log('========================================\n');
    return false;
  }
}
