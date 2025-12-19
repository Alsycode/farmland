import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import blogService from "../services/blogService";

export default function RelatedPosts({ currentPostId, tags = [] }) {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function loadRelated() {
      try {
        const res = await blogService.list({ limit: 8 });
        console.log("res",res)
        const items = res?.data.items || res?.blogs || res?.data || [];

        // simple related logic (exclude current post)
        const filtered = items.filter(
          p => p._id !== currentPostId
        );

        setPosts(filtered);
        console.log("posts",posts)
      } catch (e) {
        console.error("Failed to load related posts");
      }
    }

    loadRelated();
  }, [currentPostId]);

  const prev = () =>
    setIndex(i => (i === 0 ? posts.length - 1 : i - 1));
  const next = () =>
    setIndex(i => (i === posts.length - 1 ? 0 : i + 1));

//   if (posts.length === 0) return null;
  console.log("posts",posts)
  return (
    <section className="mt-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">
          <span className="text-green-600">Related</span> Posts
        </h3>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="
              w-10 h-10 rounded-xl flex items-center justify-center
              bg-[#eef4ee]
              shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
              active:shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="
              w-10 h-10 rounded-xl flex items-center justify-center
              bg-[#eef4ee]
              shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
              active:shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${index * 280}px)` }}
        >
          {posts.map(post => (
            <RelatedPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function RelatedPostCard({ post }) {
  return (
    <Link
      to={`/blogs/${post._id}`}
      className="
        min-w-[260px] max-w-[260px]
        rounded-2xl overflow-hidden
        bg-[#eef4ee]
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
        hover:-translate-y-1 transition
      "
    >
      <img
        src={post.featuredImage || "/placeholder-blog.jpg"}
        alt={post.title}
        className="w-full h-[180px] object-cover"
      />

      <div className="p-4 space-y-2">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          {post.category || "Blog"}
        </span>

        <h4 className="font-semibold text-green-900 text-sm leading-snug">
          {post.title}
        </h4>

        <div className="text-xs text-green-600">
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
