import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogService from "../services/blogService";
import RelatedPosts from "../components/RelatedPosts";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import SocialIcon  from "../components/SocialIcon"
/**
 * Blog Detail Page
 * - Editorial layout (content + sidebar)
 * - Earthy green neumorphism
 * - Related posts slider
 */

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await blogService.get(id);
        const data = res?.data || res?.post || res?.blog || res;
        if (mounted) setPost(data);
      } catch (e) {
        if (mounted) setErr("Failed to load article");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return <div className="text-green-700 p-10">Loading article…</div>;
  if (err) return <div className="text-red-600 p-10">{err}</div>;
  if (!post)
    return <div className="text-green-700 p-10">Article not found</div>;

  return (
    <div className="bg-[#eef4ee] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ================= MAIN CONTENT ================= */}
        <article className="lg:col-span-8 space-y-10">

          {/* ===== HEADER ===== */}
          <div
            className="
              p-8 rounded-3xl
              bg-[#eef4ee]
              shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
            "
          >
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4">
              {post.category || "General"}
            </span>

            <h1 className="text-4xl font-bold text-green-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="text-sm text-green-700 flex flex-wrap gap-4">
              <span>By {post.author}</span>
              <span>
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString()}
              </span>
              {post.readingTime && <span>{post.readingTime}</span>}
            </div>
          </div>

          {/* ===== FEATURED IMAGE ===== */}
          {post.featuredImage && (
            <div
              className="
                rounded-3xl overflow-hidden
                shadow-[10px_10px_20px_#cfd8cf,-10px_-10px_20px_#ffffff]
              "
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          )}

          {/* ===== CONTENT ===== */}
          <div
            className="
              p-8 rounded-3xl prose max-w-none
              bg-[#eef4ee]
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ===== TAGS ===== */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="
                    px-4 py-1 rounded-full text-sm
                    bg-[#eef4ee]
                    shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ===== AUTHOR BOX ===== */}
          <div
            className="
              p-6 rounded-3xl flex gap-4 items-center
              bg-[#eef4ee]
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
            "
          >
            <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-900">
              {post.author?.[0]}
            </div>
            <div>
              <h4 className="font-semibold text-green-900">
                {post.author}
              </h4>
              <p className="text-sm text-green-700">
                Sharing insights on farmland, investment & rural living.
              </p>
            </div>
          </div>

          {/* ===== RELATED POSTS ===== */}
          <RelatedPosts
            currentPostId={post._id}
            tags={post.tags}
          />

        </article>

        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-4 space-y-8">

          {/* ===== SOCIAL NETWORKS ===== */}
          <div
            className="
              p-6 rounded-3xl
              bg-[#eef4ee]
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
            "
          >
            <h3 className="font-semibold mb-4 text-green-900">
              Social Networks
            </h3>

           <div className="flex gap-4">
  <SocialIcon icon={Facebook} label="Facebook" />
  <SocialIcon icon={Twitter} label="Twitter" />
  <SocialIcon icon={Instagram} label="Instagram" />
  <SocialIcon icon={Linkedin} label="LinkedIn" />
</div>

          </div>

          {/* ===== TAG CLOUD ===== */}
          {post.tags?.length > 0 && (
            <div
              className="
                p-6 rounded-3xl
                bg-[#eef4ee]
                shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
              "
            >
              <h3 className="font-semibold mb-4 text-green-900">
                Tag Cloud
              </h3>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1 text-xs rounded-full
                      bg-green-100 text-green-700
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}
