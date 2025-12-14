// path: src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Profile page - allows simple name update via PUT /api/auth/profile (assumption).
 * We'll wire exact service in Part 4; this placeholder shows UI.
 */
export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [msg, setMsg] = useState(null);

  async function save() {
    // placeholder: implement actual API call in Part 4
    setMsg('Saved (placeholder)');
    setTimeout(() => setMsg(null), 2000);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="bg-white p-4 rounded shadow max-w-md">
        <label className="text-sm block mb-1">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
        <div className="flex gap-2">
          <button onClick={save} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
          {msg && <div className="text-sm text-green-600">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
