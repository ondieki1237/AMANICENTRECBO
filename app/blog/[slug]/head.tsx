type Params = { params: { slug: string } };

export default async function Head({ params }: Params) {
  const slug = params.slug;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!res.ok) {
      return (
        <>
          <title>Blog Post | Amani Centre</title>
        </>
      );
    }
    const post = await res.json();
    return (
      <>
        <title>{post.title} | Tana River County News</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={(post.tags || []).join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image || '/images/og-image.jpg'} />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${post.slug}`} />
      </>
    );
  } catch (e) {
    return (
      <>
        <title>Blog Post | Amani Centre</title>
      </>
    );
  }
}
