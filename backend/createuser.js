const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  try {
    const email = "admin@example.com";
    const password = "Admin123!"; // Use a secure password

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    console.log("✅ User created successfully:", email);
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
