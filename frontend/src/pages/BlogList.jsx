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
        const items = res.data?.items || res.data || res.blogs || [];
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
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="text-green-700">Loading blogs…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!posts.length)
    return <div className="text-green-700">No blog posts yet.</div>;

  const [featured, ...rest] = posts;

  return (
    <section className="bg-[#eef4ee] py-14">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* ================= FEATURED BLOG ================= */}
        <article
          className="
            grid grid-cols-1 lg:grid-cols-2 gap-8
            bg-[#eef4ee] rounded-3xl overflow-hidden
            shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
          "
        >
          {/* LEFT */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span
                className="
                  inline-block text-xs font-medium px-3 py-1 rounded-full mb-4
                  bg-[#eef4ee] text-green-800
                  shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
                "
              >
                {featured.category || "Farmland"}
              </span>

              <h2 className="text-3xl font-semibold text-green-900 leading-tight">
                <Link to={`/blogs/${featured._id}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-green-700 mt-4">
                {featured.excerpt ||
                  featured.summary ||
                  featured.content?.replace(/<[^>]+>/g, "").slice(0, 160) + "…"}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-green-700 mt-6">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{featured.views || 6941}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                <span>{featured.comments || 3}</span>
              </div>

              <span>
                {new Date(
                  featured.publishedAt || featured.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src={featured.coverImage || "/Farmland-Ownership.jpg"}
              alt={featured.title}
              className="w-full h-full object-cover"
            />

            <span
              className="
                absolute bottom-4 right-4 text-xs px-3 py-1 rounded-full
                bg-[#eef4ee] text-green-800
                shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
              "
            >
              {featured.readingTime || "2 Min Read"}
            </span>
          </div>
        </article>

        {/* ================= BLOG GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <article
              key={post._id}
              className="
                bg-[#eef4ee] rounded-3xl overflow-hidden
                shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
              "
            >
              {/* IMAGE */}
              <div className="relative h-48">
                <img
                  src={post.coverImage || "/Farmland-Ownership.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                <span
                  className="
                    absolute bottom-3 right-3 text-xs px-3 py-1 rounded-full
                    bg-[#eef4ee] text-green-800
                    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
                  "
                >
                  {post.readingTime || "2 Min Read"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="text-xs text-green-700">
                  {post.category || "Farmland"}
                </span>

                <h3 className="font-semibold text-green-900 mt-2 leading-snug">
                  <Link to={`/blogs/${post._id}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="flex items-center justify-between text-xs text-green-700 mt-5">
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
