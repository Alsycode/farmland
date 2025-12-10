// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@1234');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '6rem auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 30px rgba(2,6,23,0.08)' }}>
      <h2 style={{ marginBottom: '1rem' }}>Admin Login</h2>
      <form onSubmit={submit}>
        <label style={{ display: 'block', marginBottom: 8 }}>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input" />
        <label style={{ display: 'block', marginTop: 12, marginBottom: 8 }}>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" />
        {err && <div style={{ color: 'crimson', marginTop: 8 }}>{err}</div>}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button type="submit" onClick={()=>console.log("clciked")} style={{ padding: '10px 14px', background: 'var(--brand-primary)', color: 'black', borderRadius: 8, border: 'none' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      <style>{`
        .input { width:100%; padding:10px 12px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); }
      `}</style>
    </div>
  );
}
