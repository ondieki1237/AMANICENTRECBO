import express from 'express';
import News from '../models/News.js';
import authenticateToken from '../middleware/auth.js';
import { validateNews } from '../middleware/validate.js';
import { parseTags } from '../utils/tags.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', async (req, res, next) => {
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
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    console.log('Fetching post for slug:', req.params.slug);
    const post = await News.findOne({ slug: req.params.slug });
    if (!post) {
      console.log('Post not found for slug:', req.params.slug);
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log('Found post:', post.title);
    res.json(post); // Return single post object, matching fetchPost
  } catch (err) {
    console.error('Error fetching post:', err);
    next(err);
  }
});

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const validation = validateNews(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    let imagePath = null;
    if (req.files && req.files.image) {
      const image = req.files.image;
      if (!image.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Invalid image format' });
      }
      imagePath = `/uploads/${Date.now()}_${image.name}`;
      await image.mv(path.join(__dirname, '..', imagePath));
    }

    const post = new News({
      ...validation.data,
      tags: parseTags(validation.data.tags),
      image: imagePath,
      author: req.user.email || 'admin', // Use authenticated user's email as author
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const validation = validateNews(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    let imagePath = req.body.image;
    if (req.files && req.files.image) {
      const image = req.files.image;
      if (!image.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Invalid image format' });
      }
      imagePath = `/uploads/${Date.now()}_${image.name}`;
      await image.mv(path.join(__dirname, '..', imagePath));
    }

    const post = await News.findByIdAndUpdate(
      req.params.id,
      {
        ...validation.data,
        tags: parseTags(validation.data.tags),
        image: imagePath,
        author: req.user.email || 'admin', // Update author
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const post = await News.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;