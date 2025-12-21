import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'admin' }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function createUser() {
  await connectDB();
  
  try {
    const username = "admin";
    const email = process.env.ADMIN_EMAIL || "bellarinseth@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("✅ Admin user already exists:", email);
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      username, 
      email: email.toLowerCase(), 
      password: hashedPassword,
      role: 'admin'
    });

    await user.save();
    console.log("✅ Admin user created successfully!");
    console.log("   Email:", email);
    console.log("   Username:", username);
    console.log("   Role: admin");
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
