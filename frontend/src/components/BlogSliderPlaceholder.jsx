// path: src/components/BlogSlider.jsx
import React, { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { Link } from 'react-router-dom';

/**
 * BlogSlider fetches latest blogs from /api/blogs and renders a simple horizontal slider.
 * SRS: Home has a latest blogs slider (Part 1 used a placeholder; this replaces it).
 */

export default function BlogSlider({ limit = 6 }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await blogService.list({ limit });
        // expecting { ok:true, items: [...] } or items directly
        const items = res.items || res.data || res.blogs || [];
        if (mounted) setBlogs(items);
      } catch (err) {
        if (mounted) setBlogs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [limit]);

  if (loading) return <div className="bg-white p-4 rounded shadow">Loading blog posts…</div>;
  if (!blogs.length) return <div className="bg-white p-4 rounded shadow">No blog posts found.</div>;

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <div className="flex gap-3">
        {blogs.map((b) => (
          <article key={b._id} className="w-64 min-w-[16rem] border rounded p-3">
            <h4 className="font-semibold text-sm">{b.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-3 mt-1">{b.excerpt || b.summary || ''}</p>
            <Link to={`/blogs/${b._id}`} className="text-xs text-indigo-600 mt-2 inline-block">Read</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
