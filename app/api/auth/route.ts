import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    const response = await axios.post('https://api.otpless.app/auth/verify', {
      token,
      clientId: process.env.OTPLESS_CLIENT_ID,
      clientSecret: process.env.OTPLESS_CLIENT_SECRET,
    });

    const { email } = response.data;
    // Fetch or create user in your database
    const user = { email }; // Replace with actual user fetch/create logic

    // Generate a JWT or session token
    const jwtToken = 'your_jwt_token'; // Replace with actual JWT generation logic
    return NextResponse.json({ token: jwtToken });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}