// path: src/pages/Messages.jsx
import React, { useEffect, useState } from 'react';
import messageService from '../services/messageService';
import { useAuth } from '../context/AuthContext';

/**
 * Messages page:
 * - Inbox / Sent toggle
 * - Send new message form (toUserId or propertyId)
 * - Mark read and delete
 */

export default function Messages() {
  const { user } = useAuth();
  const [box, setBox] = useState('inbox');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await messageService.list({ box, page: 1, limit: 50 });
      if (res.ok) setItems(res.items || []);
      else alert(res.error || 'Failed to load messages');
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!recipientId && !propertyId) {
      alert('Provide recipient user ID or property ID');
      return;
    }
    try {
      const payload = {
        toUserId: recipientId || undefined,
        propertyId: propertyId || undefined,
        subject,
        content
      };
      const res = await messageService.send(payload);
      if (res.ok) {
        setSubject('');
        setContent('');
        setRecipientId('');
        setPropertyId('');
        setBox('inbox');
        fetchMessages();
      } else {
        alert(res.error || 'Failed to send');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  async function markRead(id) {
    try {
      await messageService.markRead(id);
      fetchMessages();
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  async function removeMessage(id) {
    if (!confirm('Delete message for you?')) return;
    try {
      await messageService.remove(id);
      fetchMessages();
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <div>
          <button onClick={() => setBox('inbox')} className={`px-3 py-1 rounded ${box === 'inbox' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Inbox</button>
          <button onClick={() => setBox('sent')} className={`ml-2 px-3 py-1 rounded ${box === 'sent' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Sent</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          {loading ? (
            <div className="text-gray-500">Loading…</div>
          ) : items.length === 0 ? (
            <div className="text-gray-500">No messages</div>
          ) : (
            <ul className="space-y-2">
              {items.map(m => (
                <li key={m._id} className="p-3 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{m.subject || '(no subject)'}</div>
                      <div className="text-sm text-gray-500">From: {m.from?.name || m.from?.email} — To: {m.to?.name || m.to?.email}</div>
                      <div className="mt-2">{m.content}</div>
                      <div className="text-xs text-gray-400 mt-2">{new Date(m.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {!m.read && box === 'inbox' && <button onClick={() => markRead(m._id)} className="px-2 py-1 bg-green-100 rounded">Mark read</button>}
                      <button onClick={() => removeMessage(m._id)} className="px-2 py-1 bg-red-100 rounded text-red-600">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">New message</h3>
          <form onSubmit={sendMessage} className="space-y-2">
            <div>
              <label className="text-sm block mb-1">To user id (optional)</label>
              <input value={recipientId} onChange={(e) => setRecipientId(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="User ObjectId" />
            </div>
            <div>
              <label className="text-sm block mb-1">Or property id (optional)</label>
              <input value={propertyId} onChange={(e) => setPropertyId(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="Property ObjectId" />
            </div>
            <div>
              <label className="text-sm block mb-1">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
              <label className="text-sm block mb-1">Content</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border rounded px-2 py-1" rows={4} />
            </div>
            <div>
              <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
