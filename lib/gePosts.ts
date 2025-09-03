// In @/lib/getPosts.ts (create if needed)
export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`);
  if (!res.ok) throw new Error('Failed to