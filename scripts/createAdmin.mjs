// Script to create an admin user in MongoDB
// Run with: node scripts/createAdmin.mjs

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

// Import User model - using dynamic import to handle ES modules
const UserModule = await import('../backend/models/User.ts');
const User = UserModule.default;

async function createAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected successfully!');

        // Check if admin already exists
        const existing = await User.findOne({ email: 'bellarinseth@gmail.com' });
        if (existing) {
            console.log('Admin user already exists!');
            console.log('Email:', existing.email);
            console.log('Username:', existing.username);
            process.exit(0);
        }

        // Create new admin user
        console.log('\nCreating admin user...');
        const admin = await User.create({
            username: 'admin',
            email: 'bellarinseth@gmail.com',
            password: 'admin123', // Will be hashed automatically by the pre-save hook
            role: 'admin'
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Username:', admin.username);
        console.log('Role:', admin.role);
        console.log('\nYou can now login at /admin/signin with:');
        console.log('  Email: bellarinseth@gmail.com');
        console.log('  Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}

createAdmin();
