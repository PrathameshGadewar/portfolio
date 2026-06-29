import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/User';
import { sendOTPEmail } from '@/lib/mail';
import { sendOTPSMS } from '@/lib/sms';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password, otp } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Step 1: Request OTP (no OTP sent in body yet)
    if (!otp) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      user.otp = generatedOtp;
      user.otpExpires = otpExpires;
      await user.save();

      // Trigger OTP delivery
      await sendOTPEmail(user.email, generatedOtp);
      if (user.phone) {
        await sendOTPSMS(user.phone, generatedOtp);
      }

      return NextResponse.json({
        message: 'Verification code sent to your registered email and phone.',
        otpRequired: true,
        success: true
      });
    }

    // Step 2: Verify OTP
    if (!user.otp || user.otp !== otp || !user.otpExpires || new Date() > user.otpExpires) {
      return NextResponse.json({ message: 'Invalid or expired verification code' }, { status: 401 });
    }

    // Clear OTP fields upon successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key_change_in_production',
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ message: 'Login successful', success: true });
    
    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    
    let message = 'Internal server error';
    if (error.message.includes('ETIMEOUT') || error.message.includes('selection timeout')) {
      message = 'Database connection timeout. Please check if your IP is whitelisted in MongoDB Atlas.';
    } else if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
      message = 'Database error: ' + error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}
