import React, { useState } from "react";
import posts from "../data/posts";
import BlogListItem from "../components/BlogListItem";
import SidebarAd from "../components/SidebarAd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
     
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid grid-cols-12 gap-8">
          {/* left column - posts list */}
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-6">
              <h2 className="text-4xl font-extrabold text-[#0f172a]">Blog</h2>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              {/* Render list */}
              {filtered.map((post) => (
                <BlogListItem key={post.id} post={post} />
              ))}

              {/* small pagination placeholder */}
              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <button className="px-4 py-2 border rounded-md">Prev</button>
                  <button className="px-4 py-2 border rounded-md">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* right column - search + ad */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <SidebarAd image="/mnt/data/Screenshot 2025-12-03 094934.png" />

              {/* small recent posts box */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold mb-3">Recent posts</h4>
                <ul className="space-y-3 text-gray-700">
                  {posts.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <Link to={`/blog/${p.id}`} className="text-sm hover:text-accent">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>


    </div>
  );
}
