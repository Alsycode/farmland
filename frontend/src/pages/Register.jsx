// path: src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [err, setErr] = useState(null); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await register({ name, email, password });
      // If register auto-logged-in, user will be present; otherwise navigate to login
      navigate('/dashboard');
    } catch (error) {
      const msg = error?.error || error?.message || (error?.response && error.response.data && error.response.data.error) || 'Registration failed';
      setErr(msg);
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="text-sm block mb-1">Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="text-sm block mb-1">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
        <div><label className="text-sm block mb-1">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
        {err && <div className="text-red-600">{err}</div>}
        <div><button disabled={loading} className="w-full bg-indigo-600 text-white px-3 py-2 rounded">{loading ? 'Registering…' : 'Register'}</button></div>
      </form>
    </div>
  );
}
