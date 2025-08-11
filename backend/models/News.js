import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  readTime: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  slug: { type: String, required: true, unique: true },
  image: { type: String, default: null },
});

export default mongoose.model('News', newsSchema);