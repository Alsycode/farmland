import React from "react";
import { Link } from "react-router-dom";

/**
 * Single row item as in screenshot: small thumbnail left, title + meta + excerpt right
 */
export default function BlogListItem({ post }) {
  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex items-start gap-6">
        <div className="w-40 flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-24 object-cover rounded-sm shadow-sm"
          />
        </div>

        <div className="flex-1">
          <Link to={`/blog/${post.id}`} className="block">
            <h3 className="text-xl font-semibold text-[#0f172a] hover:text-accent">
              {post.title}
            </h3>
          </Link>

          <div className="mt-2 text-sm text-gray-500">
            {post.date}
          </div>

          <p className="mt-3 text-gray-600">{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
}
