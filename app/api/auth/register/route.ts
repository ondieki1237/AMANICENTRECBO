import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/backend/models/User';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      email,
      username,
      password,
      role: 'admin' // Since this is the first user, we'll make them an admin
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    };

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 