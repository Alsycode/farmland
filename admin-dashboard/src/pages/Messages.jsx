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

  /* ================= neumorphism helpers ================= */

  const card =
    "bg-[#1e2229] rounded-2xl p-5 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl px-3 py-2 text-gray-200 " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32] " +
    "focus:outline-none";

  const btn =
    "px-3 py-2 rounded-xl text-sm transition " +
    "shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32] " +
    "active:shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  const label = "text-xs text-gray-400 mb-1 block";

  return (
    <div className="text-gray-200 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setBox('inbox')}
            className={
              btn +
              (box === 'inbox'
                ? ' text-indigo-400'
                : ' text-gray-400')
            }
          >
            Inbox
          </button>
          <button
            onClick={() => setBox('sent')}
            className={
              btn +
              (box === 'sent'
                ? ' text-indigo-400'
                : ' text-gray-400')
            }
          >
            Sent
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message list */}
        <div className={"lg:col-span-2 " + card}>
          {loading ? (
            <div className="text-gray-400">Loading…</div>
          ) : items.length === 0 ? (
            <div className="text-gray-400">No messages</div>
          ) : (
            <ul className="space-y-4">
              {items.map((m) => (
                <li
                  key={m._id}
                  className={
                    "rounded-xl p-4 " +
                    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]"
                  }
                >
                  <div className="flex justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {m.subject || '(no subject)'}
                      </div>
                      <div className="text-xs text-gray-400">
                        From: {m.from?.name || m.from?.email} — To:{' '}
                        {m.to?.name || m.to?.email}
                      </div>
                      <div className="text-sm mt-2">
                        {m.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {!m.read && box === 'inbox' && (
                        <button
                          onClick={() => markRead(m._id)}
                          className={btn + " text-green-400"}
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => removeMessage(m._id)}
                        className={btn + " text-red-400"}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* New message */}
        <div className={card}>
          <h3 className="font-semibold mb-4">New message</h3>
          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className={label}>To user id (optional)</label>
              <input
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className={inset + " w-full"}
                placeholder="User ObjectId"
              />
            </div>

            <div>
              <label className={label}>Or property id (optional)</label>
              <input
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className={inset + " w-full"}
                placeholder="Property ObjectId"
              />
            </div>

            <div>
              <label className={label}>Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inset + " w-full"}
              />
            </div>

            <div>
              <label className={label}>Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className={inset + " w-full resize-none"}
              />
            </div>

            <button
              type="submit"
              className={btn + " text-indigo-400"}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
