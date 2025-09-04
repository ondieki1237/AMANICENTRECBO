import { connectDB } from '../lib/mongodb';
import { User } from '../backend/models/User';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminData);
    console.log('Admin user created successfully:', {
      id: admin._id,
      email: admin.email,
      username: admin.username,
      role: admin.role
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 