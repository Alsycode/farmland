// path: src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogService';

/**
 * Blog detail — fetch GET /api/blogs/:id and render content (SRS: blog detail page)
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
        const data = res.data || res.post || res.blog || res;
        if (mounted) setPost(data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.error || e.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="text-gray-500">Loading article…</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!post) return <div className="text-gray-500">Article not found</div>;

  return (
    <article className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">Published: {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()}</div>
      {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover mb-4 rounded" />}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || post.body || post.html || (post.text || '') }} />
    </article>
  );
}
