import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

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
