import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import nodemailer from "nodemailer";

// Configure __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Configuration Constants
const CONFIG = {
  PORT: process.env.PORT || 5013,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_CONFIG: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER
  },
  ALLOWED_ORIGINS: [
    'https://amanicentrecbo-client.onrender.com',
    'http://localhost:3000',
    'https://amanicentrecbo-beta.vercel.app',
    'https://amanicentercbo.org',
    'http://amanicentercbo.org',
    'https://www.amanicentercbo.org',
    'https://backendmanager.vercel.app',
    'https://amanicentrecbo-jmp7hkkz1-sethmose31-9319s-projects.vercel.app',
    'https://amanicentrecbo.vercel.app',
    'https://amani.codewithseth.co.ke',
    'http://amani.codewithseth.co.ke'
  ],
  UPLOADS_DIR: path.join(__dirname, "uploads")
};

// Validate environment variables (warn instead of exit for some)
const validateEnv = () => {
  const essentialVars = ['MONGODB_URI', 'JWT_SECRET'];
  const recommendedVars = ['EMAIL_USER', 'EMAIL_PASS'];

  const missingEssential = essentialVars.filter(v => !process.env[v]);
  const missingRecommended = recommendedVars.filter(v => !process.env[v]);

  if (missingEssential.length > 0) {
    console.error(`CRITICAL: Missing essential environment variables: ${missingEssential.join(', ')}`);
    // Still don't exit! Let Render bind the port so we can see error logs via /api/health
  }
  if (missingRecommended.length > 0) {
    console.warn(`WARNING: Missing recommended environment variables: ${missingRecommended.join(', ')}`);
  }
};

validateEnv();

// Database Models
const setupModels = () => {
  const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    readTime: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: null }
  });

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  }, { timestamps: true });

  return {
    News: mongoose.model("News", newsSchema),
    User: mongoose.model("User", userSchema)
  };
};

// Middleware
const setupMiddleware = () => {
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Mirror the origin if it matches our list, otherwise allow *
    if (origin && (CONFIG.ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com') ||
      origin.includes('codewithseth.co.ke'))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'false');

    // Handle pre-flight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  app.use(express.json());
  app.use(fileUpload());
  app.use("/uploads", express.static(CONFIG.UPLOADS_DIR));
};

// Authentication
const authMiddleware = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, CONFIG.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  }
};

// Email Service
const emailService = {
  transporter: nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: CONFIG.EMAIL_CONFIG.user,
      pass: CONFIG.EMAIL_CONFIG.pass
    }
  }),

  verifyConnection: async () => {
    try {
      await emailService.transporter.verify();
      console.log('Email transporter is ready');
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      console.warn('Server will continue without email functionality');
      // Don't exit - allow server to run without email
    }
  },

  sendEmail: async (options) => {
    try {
      return await emailService.transporter.sendMail(options);
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }
};

// Utility Functions
const utils = {
  parseTags: (tags) => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    if (Array.isArray(tags)) return tags.map(tag => tag.trim());
    try {
      return JSON.parse(tags).map(tag => tag.trim());
    } catch {
      throw new Error('Invalid tags format');
    }
  },

  handleImageUpload: async (file, dir) => {
    if (!file) {
      console.log("No image file provided in request");
      return null;
    }
    if (!file.mimetype.startsWith("image/")) {
      console.error("Invalid file format:", file.mimetype);
      throw new Error('Invalid image format');
    }

    const imagePath = `/uploads/${Date.now()}_${file.name}`;
    await file.mv(path.join(dir, imagePath));
    return imagePath;
  },

  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateImageUrl: (url) =>
    /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/.+/.test(url)
};

// Controllers
const createControllers = (models) => {
  const { News, User } = models;

  return {
    auth: {
      register: async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ email, password: hashedPassword });
          await user.save();

          res.status(201).json({ message: "User created" });
        } catch (err) {
          res.status(500).json({ error: "Registration failed: " + err.message });
        }
      },

      login: async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
          }

          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          const token = jwt.sign({ id: user._id, role: user.role }, CONFIG.JWT_SECRET, { expiresIn: "1h" });
          res.json({
            jwt: token,
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
          });
        } catch (err) {
          res.status(500).json({ error: "Login failed: " + err.message });
        }
      }
    },

    news: {
      getAll: async (req, res) => {
        try {
          const { category, exclude, limit } = req.query;
          const query = {};

          if (category) query.category = category;
          if (exclude) query._id = { $ne: exclude };

          const posts = await News.find(query)
            .limit(parseInt(limit) || 10)
            .sort({ date: -1 });

          res.json(posts);
        } catch (err) {
          res.status(500).json({ error: "Failed to fetch posts: " + err.message });
        }
      },

      getBySlug: async (req, res) => {
        try {
          const post = await News.findOne({ slug: req.params.slug });
          if (!post) return res.status(404).json({ error: "Post not found" });
          res.json(post);
        } catch (err) {
          res.status(500).json({ error: "Failed to fetch post: " + err.message });
        }
      },

      create: async (req, res) => {
        try {
          console.log("POST /api/news request body:", req.body);
          console.log("POST /api/news files:", req.files);

          const { title, excerpt, content, date, readTime, category, tags, slug, image } = req.body;
          const requiredFields = { title, excerpt, content, date, readTime, category, slug };

          if (Object.values(requiredFields).some(field => !field)) {
            return res.status(400).json({ error: "All required fields must be provided" });
          }

          // Check for duplicate slug
          const existingPost = await News.findOne({ slug });
          if (existingPost) return res.status(400).json({ error: "Slug already exists" });

          // Handle image: prefer req.files?.image, fallback to req.body.image
          let imagePath = null;
          if (req.files?.image) {
            imagePath = await utils.handleImageUpload(req.files.image, CONFIG.UPLOADS_DIR);
          } else if (image && utils.validateImageUrl(image)) {
            imagePath = image; // Use provided Cloudinary URL
            console.log("Using image URL from req.body:", imagePath);
          } else {
            console.log("No valid image provided in req.files or req.body");
          }

          const parsedTags = utils.parseTags(tags);

          const post = new News({
            ...requiredFields,
            tags: parsedTags,
            image: imagePath,
          });

          await post.save();
          console.log("Saved post:", post);
          res.status(201).json(post);
        } catch (err) {
          res.status(500).json({
            error: "Failed to create post: " + (err.message.includes('tags') ? 'Invalid tags format' : err.message)
          });
        }
      },

      update: async (req, res) => {
        try {
          console.log("PUT /api/news/:id request body:", req.body);
          console.log("PUT /api/news/:id files:", req.files);

          const { title, excerpt, content, date, readTime, category, tags, slug, image } = req.body;
          const requiredFields = { title, excerpt, content, date, readTime, category, slug };

          if (Object.values(requiredFields).some(field => !field)) {
            return res.status(400).json({ error: "All required fields must be provided" });
          }

          // Check for duplicate slug (excluding current post)
          const existingPost = await News.findOne({ slug, _id: { $ne: req.params.id } });
          if (existingPost) return res.status(400).json({ error: "Slug already exists" });

          // Handle image: prefer req.files?.image, fallback to req.body.image
          let imagePath = null;
          if (req.files?.image) {
            imagePath = await utils.handleImageUpload(req.files.image, CONFIG.UPLOADS_DIR);
          } else if (image && utils.validateImageUrl(image)) {
            imagePath = image; // Use provided Cloudinary URL
            console.log("Using image URL from req.body:", imagePath);
          } else {
            console.log("No valid image provided in req.files or req.body");
          }

          const parsedTags = utils.parseTags(tags);

          const post = await News.findByIdAndUpdate(
            req.params.id,
            { ...requiredFields, tags: parsedTags, image: imagePath },
            { new: true }
          );

          if (!post) return res.status(404).json({ error: "Post not found" });
          res.json(post);
        } catch (err) {
          res.status(500).json({
            error: "Failed to update post: " + (err.message.includes('tags') ? 'Invalid tags format' : err.message)
          });
        }
      },

      delete: async (req, res) => {
        try {
          const post = await News.findByIdAndDelete(req.params.id);
          if (!post) return res.status(404).json({ error: "Post not found" });
          res.json({ message: "Post deleted" });
        } catch (err) {
          res.status(500).json({ error: "Failed to delete post: " + err.message });
        }
      }
    },

    email: {
      sendContact: async (req, res) => {
        try {
          const { name, email, phone = '', message, subject = 'New Contact from Amani Center Website' } = req.body;

          if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
          }

          if (!utils.validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
          }

          const mailOptions = {
            from: `"Amani Center" <${CONFIG.EMAIL_CONFIG.user}>`,
            to: CONFIG.EMAIL_CONFIG.to,
            subject,
            text: `Contact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2>New Contact Request</h2>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            `
          };

          await emailService.sendEmail(mailOptions);
          res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
      },

      sendVolunteerApplication: async (req, res) => {
        try {
          const { name, email, phone = '', skills = '', opportunities = [], message = '' } = req.body;

          if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
          }

          if (!utils.validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
          }

          const opportunitiesText = opportunities?.length ? opportunities.join(', ') : 'None selected';

          // Admin notification
          await emailService.sendEmail({
            from: `"Amani Center" <${CONFIG.EMAIL_CONFIG.user}>`,
            to: CONFIG.EMAIL_CONFIG.to,
            replyTo: email,
            subject: 'New Volunteer Application',
            text: `Application Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSkills: ${skills}\nOpportunities: ${opportunitiesText}\nMessage: ${message}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2>Volunteer Application</h2>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p><strong>Skills:</strong> ${skills || 'Not provided'}</p>
                  <p><strong>Opportunities:</strong> ${opportunitiesText}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message || 'None provided'}</p>
                </div>
              </div>
            `
          });

          // Applicant confirmation
          await emailService.sendEmail({
            from: `"Amani Center" <${CONFIG.EMAIL_CONFIG.user}>`,
            to: email,
            subject: 'Thank You for Your Application',
            text: `Dear ${name},\n\nThank you for applying to volunteer. We'll review your application shortly.\n\nAmani Center Team`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2>Thank You for Applying!</h2>
                <p>Dear ${name},</p>
                <p>Thank you for applying to volunteer. We'll review your application shortly.</p>
                <p>Best regards,<br/><strong>Amani Center Team</strong></p>
              </div>
            `
          });

          res.status(200).json({ success: true, message: 'Application submitted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to process application', details: error.message });
        }
      }
    }
  };
};

// Routes
const setupRoutes = (controllers) => {
  // Auth Routes
  app.post("/api/register", controllers.auth.register);
  app.post("/api/login", controllers.auth.login);

  // News Routes
  app.get("/api/news", controllers.news.getAll);
  app.get("/api/news/:slug", controllers.news.getBySlug);
  app.post("/api/news", authMiddleware.authenticateToken, controllers.news.create);
  app.put("/api/news/:id", authMiddleware.authenticateToken, controllers.news.update);
  app.delete("/api/news/:id", authMiddleware.authenticateToken, controllers.news.delete);

  // Email Routes
  app.post('/api/send-email', controllers.email.sendContact);
  app.post('/api/volunteer-application', controllers.email.sendVolunteerApplication);
};

// Setup everything immediately
const models = setupModels();
setupMiddleware();
const controllers = createControllers(models);
setupRoutes(controllers);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server Initialization
const startServer = async () => {
  // Start listening immediately so Render is happy
  const server = app.listen(CONFIG.PORT, () => {
    console.log(`Server running on port ${CONFIG.PORT}`);
  });

  try {
    // Connect to MongoDB in the background
    console.log("Connecting to MongoDB...");
    await mongoose.connect(CONFIG.MONGODB_URI, {
      maxPoolSize: 10
    });
    console.log("MongoDB connected");

    // Verify email connection
    await emailService.verifyConnection();

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      await mongoose.disconnect();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Initial background connection failed:', error.message);
    // Let the server keep running, it will try to reconnect or just serve 5xx for data routes
  }
};

startServer();