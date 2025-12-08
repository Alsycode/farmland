import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import posts from "../data/posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogMeta from "../components/BlogMeta";
import SidebarAd from "../components/SidebarAd";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-semibold">Post not found</h2>
            <p className="mt-4 text-gray-600">We couldn't find the article you requested.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-accent text-white rounded-md"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
   

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-tight">
              {post.title}
            </h1>

            <BlogMeta date={post.date} readTime={post.readTime} author={post.author} className="mt-6" />

            <div className="mt-6 card-frame bg-white rounded-xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-[420px] object-cover" />
            </div>

            <article className="mt-8">
              <div className="bg-white rounded-xl p-8 shadow-sm text-gray-800 leading-relaxed">
                {/* post.content contains HTML fragments - render with dangerouslySetInnerHTML */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </article>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <SidebarAd image="/mnt/data/Screenshot 2025-12-03 094934.png" />
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold mb-2">More posts</h4>
                <ul className="space-y-2 text-gray-700">
                  {posts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 4)
                    .map((p) => (
                      <li key={p.id}>
                        <Link to={`/blog/${p.id}`} className="hover:text-accent">
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
