// path: src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import blogService from "../services/blogService";
import { Link } from "react-router-dom";
import { Eye, MessageCircle } from "lucide-react";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await blogService.list({ limit: 10 });
        const items = res.items || res.data || res.blogs || [];
        if (mounted) setPosts(items);
      } catch (err) {
        if (mounted)
          setError(
            err?.response?.data?.error ||
              err.message ||
              "Failed to load blogs"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="text-gray-500">Loading blogs…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (posts.length === 0)
    return <div className="text-gray-500">No blog posts yet.</div>;

  const [featured, ...rest] = posts.items;

  return (
    <section className="bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* ================= FEATURED BLOG ================= */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Left content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs font-medium bg-gray-100 px-3 py-1 rounded-full mb-4">
                {posts.items[0].category || "Web Development"}
              </span>

              <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                <Link to={`/blogs/${posts.items[0]._id}`}>
                  {posts.items[0].title}
                </Link>
              </h2>

              <p className="text-gray-600 mt-4">
                {posts.items[0].excerpt ||
                  posts.items[0].summary ||
                  posts.items[0].content?.slice(0, 160) + "…"}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 mt-6">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{posts.items[0].views || 6941}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                <span>{posts.items[0].comments || 3}</span>
              </div>

              <span>
                {new Date(
                  posts.items[0].publishedAt || posts.items[0].createdAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <img
              src={posts.items[0].coverImage || "/Farmland-Ownership.jpg"}
              alt={posts.items[0].title}
              className="w-full h-full object-cover"
            />

            <span className="absolute bottom-4 right-4 bg-white text-xs font-medium px-3 py-1 rounded-full shadow">
              2 min Read
            </span>
          </div>
        </article>

        {/* ================= BLOG GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.items.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src="/Farmland-Ownership.jpg"
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                <span className="absolute bottom-3 right-3 bg-white text-xs px-3 py-1 rounded-full shadow">
                  2 min Read
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-gray-500">
                  {post.category || "Lifestyle"}
                </span>

                <h3 className="font-semibold text-gray-900 mt-2 leading-snug">
                  <Link to={`/blogs/${post._id}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar || "/Farmland-Ownership.jpg"}
                      alt="author"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{post.author || "Admin"}</span>
                  </div>

                  <span>
                    {new Date(
                      post.publishedAt || post.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
