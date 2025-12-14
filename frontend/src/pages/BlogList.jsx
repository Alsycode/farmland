// path: src/pages/BlogList.jsx
import React, { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { Link } from 'react-router-dom';

/**
 * Blog list page — fetches GET /api/blogs and displays posts.
 * SRS: Blog list on website (home slider earlier); here full list with pagination (simple).
 */

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await blogService.list({ limit: 50 });
        const items = res.items || res.data || res.blogs || [];
        if (mounted) setPosts(items);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.error || err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blog</h2>
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-gray-500">Loading posts…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500">No blog posts yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map(post => (
              <article key={post._id} className="border rounded p-4">
                <h3 className="font-semibold"><Link to={`/blogs/${post._id}`}>{post.title}</Link></h3>
                <div className="text-sm text-gray-500 mt-1">{post.excerpt || post.summary || (post.content || '').slice(0, 140) + '…'}</div>
                <div className="mt-3 text-xs text-gray-400">Published: {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()}</div>
                <Link to={`/blogs/${post._id}`} className="mt-2 inline-block text-indigo-600">Read more →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
