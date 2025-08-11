import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Post } from '@/models/Post';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const exclude = searchParams.get('exclude');
    const limit = searchParams.get('limit');

    console.log('GET /api/news query:', { slug, category, exclude, limit });

    if (slug) {
      const post = await Post.findOne({ slug });
      console.log('Found post for slug:', slug, post);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json([post]); // Return as array for consistency with frontend
    }

    if (category) {
      const query: any = { category };
      if (exclude) query._id = { $ne: exclude };
      const posts = await Post.find(query).limit(parseInt(limit || '3')).sort({ date: -1 });
      console.log('Found related posts for category:', category, posts);
      return NextResponse.json(posts);
    }

    const posts = await Post.find().sort({ date: -1 });
    console.log('Found all posts:', posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    console.log('Received POST payload:', data);

    const post = await Post.create({
      ...data,
      author: session.user.username,
      image: data.image || null, // Ensure image is null if not provided
    });

    console.log('Created post:', post);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    console.log('Received PUT payload for id:', id, data);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...data, author: session.user.username, image: data.image || null },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Updated post:', updatedPost);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Deleted post:', id);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}