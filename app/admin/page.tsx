// app/admin/page.tsx
"use client";

import { useState, useEffect, Component, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import Footer from "../../components/footer";
import ModernNavbar from "../../components/modern-navbar";
import { Label } from "../../components/ui/label";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { getBackendUrl } from "../../lib/utils";

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string | null;
}

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string;
  slug: string;
}

interface CustomSession extends Session {
  accessToken?: string;
}

interface TiptapToolbarProps {
  editor: ReturnType<typeof useEditor> | null;
}

// Error Boundary to catch runtime errors
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again.</div>;
    }
    return this.props.children;
  }
}

const EditorContentNoSSR = dynamic(() => import("@tiptap/react").then((mod) => mod.EditorContent), { ssr: false });

const uploadToCloudinary = async (file: File) => {
  try {
    console.log("Starting Cloudinary upload for file:", file.name, file.type, file.size);
    const formData = new FormData();
    formData.append("file", file);
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET";
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "diaceq8bv";
    formData.append("upload_preset", "amanicbo1"); // Replace with your preset
    formData.append("folder", "amanicentrecbo_blog"); // Optional: specify folder in Cloudinary

    console.log("Cloudinary upload config:", { cloudName, uploadPreset });

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error response:", errorData);
      throw new Error(`Image upload failed: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    console.log("Cloudinary upload success:", data);
    return data.secure_url as string;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-100 rounded">
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200" : ""}
      >
        Bold
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200" : ""}
      >
        Italic
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
      >
        H2
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const url = prompt("Enter link URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        Link
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const url = prompt("Enter image URL:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        Image
      </Button>
    </div>
  );
};

export default function AdminDashboard() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "",
    category: "Education",
    tags: "",
    slug: "",
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: formData.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    if (status === "unauthenticated") {
      console.log("Redirecting to /admin/signin");
      router.push("/admin/signin");
    } else if (status === "authenticated" && session?.accessToken) {
      console.log("Fetching posts with token:", session.accessToken);
      fetchPosts();
    } else {
      console.log("Session not ready or token missing:", session);
    }
  }, [status, session, router]);

  useEffect(() => {
    if (editor && selectedPost) {
      console.log("Setting editor content:", selectedPost.content);
      editor.commands.setContent(selectedPost.content);
    }
  }, [editor, selectedPost]);

  // ... other imports and code remain the same
  const fetchPosts = async () => {
    setLoading(true);
    try {
      if (!session?.accessToken) {
        throw new Error("Authentication token is missing. Please sign in again.");
      }
      const response = await fetch(`${getBackendUrl()}/api/news`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: "no-store", // Add cache: "no-store" to ensure fresh data
      });
      console.log("Fetch posts response status:", response.status);
      const data = await response.json();
      console.log("Fetch posts data:", data);
      if (!response.ok) {
        throw new Error(data.error || `Failed to fetch posts (status: ${response.status})`);
      }
      setPosts(data || []);
    } catch (error: any) {
      setError(`Failed to fetch posts: ${error.message}`);
      console.error("Fetch posts error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = imagePreview;
      // const Taliro: The code already does this correctly.
      const form = e.target as HTMLFormElement;
      const imageFile = form.image?.files?.[0];
      console.log("Selected image file:", imageFile?.name);
      if (imageFile) {
        console.log("Uploading image to Cloudinary:", imageFile.name, imageFile.type, imageFile.size);
        try {
          imageUrl = await uploadToCloudinary(imageFile);
          console.log("Cloudinary image URL:", imageUrl);
        } catch (uploadError: any) {
          console.error("Image upload error:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }
      }

      const payload = {
        ...formData,
        image: imageUrl || null,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
      };

      console.log("Sending payload to backend:", payload); // Debug payload

      const url = selectedPost
        ? `${getBackendUrl()}/api/news?id=${selectedPost._id}`
        : `${getBackendUrl()}/api/news`;
      const method = selectedPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.error || "Failed to save post");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData); // Debug response

      setShowSuccess(true);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      setError(`Error saving post: ${error.message}`);
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError("");
    setLoading(true);
    try {
      if (!session?.accessToken) {
        throw new Error("Authentication token is missing. Please sign in again.");
      }
      const response = await fetch(`${getBackendUrl()}/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: "no-store", // Add cache: "no-store" to ensure fresh data
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post");
      }
      fetchPosts();
    } catch (error: any) {
      setError(`Error deleting post: ${error.message}`);
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(null);
    }
  };
  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: new Date(post.date).toISOString().split("T")[0],
      readTime: post.readTime,
      category: post.category,
      tags: post.tags.join(", "),
      slug: post.slug,
    });
    editor?.commands.setContent(post.content);
    setImagePreview(post.image || null);
  };

  const resetForm = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      readTime: "",
      category: "Education",
      tags: "",
      slug: "",
    });
    editor?.commands.clearContent();
    setImagePreview(null);
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-gray-600">Loading...</p></div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => signIn("credentials", { callbackUrl: "/admin" })}
        >
          Sign In to Access Dashboard
        </Button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <ModernNavbar />
        <section className="bg-gradient-to-r from-emerald-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">Create, edit, and manage news posts for Tana River County.</p>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-4 bg-white text-emerald-600 hover:bg-gray-100"
            >
              Sign Out
            </Button>
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{isEditing ? "Edit Post" : "Create New Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700">{error}</p></div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Input
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Enter post excerpt"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <TiptapToolbar editor={editor} />
                    <EditorContentNoSSR editor={editor} className="mt-1 border rounded p-2 min-h-[200px] bg-white" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="e.g., 5 min read"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Partnerships">Partnerships</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Politics">Politics</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Weather">Weather</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Enter tags (comma-separated)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Enter slug (e.g., my-news-post)"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Featured Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      className="mt-1"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {imagePreview && (
                      <div className="relative mt-2 w-full max-w-xs">
                        <img src={imagePreview} alt="Preview" className="h-40 w-full object-cover rounded border" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {isEditing ? "Updating..." : "Creating..."}
                        </span>
                      ) : isEditing ? "Update Post" : "Create Post"}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Existing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {loading && <p className="text-gray-600">Loading posts...</p>}
                {!loading && posts.length === 0 && <p className="text-gray-600">No posts found.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Card key={post._id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-emerald-600">{post.title}</h3>
                        <p className="text-gray-600 line-clamp-2 mt-2">{post.excerpt}</p>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            className="group-hover:text-emerald-600"
                          >
                            <Edit2 className="h-4 w-4 mr-2" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(post._id)}
                            className="group-hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
            </DialogHeader>
            <p>Post {isEditing ? "updated" : "created"} successfully!</p>
            <DialogFooter>
              <Button onClick={() => setShowSuccess(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (showDeleteConfirm) {
                    handleDelete(showDeleteConfirm);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}