import React, { useEffect, useState } from "react";
import blogService from "../services/blogService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {Link} from "react-router-dom";
export default function HomeBlogSlider() {
  const [blogs, setBlogs] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        const res = await blogService.list({ limit: 6 });
        const items = res?.items || res?.data || res?.blogs || [];
        console.log("xxxxxxx",items)
        if (mounted) setBlogs(items?.items);
      } catch (e) {
        console.error("Failed to load blogs", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadBlogs();
    return () => (mounted = false);
  }, []);

//   if (loading || blogs.length < 3) return null;

  const prev = () =>
    setActive(i => (i === 0 ? blogs.length - 1 : i - 1));
  const next = () =>
    setActive(i => (i === blogs.length - 1 ? 0 : i + 1));

  const left = blogs[(active - 1 + blogs.length) % blogs.length];
  const center = blogs[active];
  const right = blogs[(active + 1) % blogs.length];

  return (
    <section className="mt-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-green-900">
          Blog & Insights
        </h2>

      <div className="flex gap-3">
  <button
    onClick={prev}
    className="
      w-11 h-11 flex items-center justify-center
      rounded-xl bg-[#eef4ee]
      shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
      text-green-700
      hover:text-green-900
      active:shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
      transition-all
    "
    aria-label="Previous blog"
  >
    <ChevronLeft size={20} />
  </button>

  <button
    onClick={next}
    className="
      w-11 h-11 flex items-center justify-center
      rounded-xl bg-[#eef4ee]
      shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
      text-green-700
      hover:text-green-900
      active:shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
      transition-all
    "
    aria-label="Next blog"
  >
    <ChevronRight size={20} />
  </button>
</div>

      </div>

      {/* SLIDER */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <PreviewCard blog={left} />
        <FeaturedCard blog={center} />
        <PreviewCard blog={right} />
      </div>
    </section>
  );
}

/* ================= FEATURED ================= */

function FeaturedCard({ blog }) {
  if (!blog) return null;

  const image =
    blog.image || blog.coverImage || blog.featuredImage || "/placeholder-blog.jpg";

  return (
    <div className="col-span-12 md:col-span-6">
      <div
        className="
          relative rounded-3xl overflow-hidden
          bg-[#eef4ee]
          shadow-[12px_12px_24px_#cfd8cf,-12px_-12px_24px_#ffffff]
        "
      >
        <img
          src={image}
          alt={blog.title || "Blog"}
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
            <Link to={`/blogs/${blog._id}`}>
             <div
            className="
              bg-[#eef4ee]
              rounded-2xl px-6 py-5 text-center
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
              max-w-sm
            "
          >
            <span className="text-xs text-green-700 uppercase tracking-widest">
              {blog.category || "Marketing"}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-green-900">
              {blog.title}
            </h3>

            <div className="mt-3 text-sm text-green-700">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : ""}
              {" • "}
              {blog.author?.name || "Admin"}
            </div>
          </div></Link>
         
        </div>
      </div>
    </div>
  );
}

/* ================= PREVIEW ================= */

function PreviewCard({ blog }) {
  if (!blog) return null;

  const image =
    blog.image || blog.coverImage || blog.featuredImage || "/placeholder-blog.jpg";

  return (
    <div className="hidden md:block md:col-span-3">
      <div
        className="
          relative rounded-2xl overflow-hidden
          bg-[#eef4ee]
          shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
          scale-95 opacity-90
        "
      >
        <img
          src={image}
          alt={blog.title || "Blog"}
          className="w-full h-[320px] object-cover"
        />
      </div>
    </div>
  );
}
