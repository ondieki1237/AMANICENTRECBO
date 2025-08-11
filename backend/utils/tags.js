export const parseTags = (tags) => {
  if (!tags) return [];
  if (typeof tags === 'string') {
    try {
      return JSON.parse(tags).map((tag) => tag.trim());
    } catch {
      return tags.split(',').map((tag) => tag.trim());
    }
  }
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim());
  }
  return [];
};