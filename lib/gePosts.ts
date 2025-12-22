import { getBackendUrl } from "./utils";

// In @/lib/getPosts.ts (create if needed)
export async function getAllPosts() {
  const res = await fetch(`${getBackendUrl()}/api/news`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}