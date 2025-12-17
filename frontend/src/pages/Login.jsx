import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      const msg =
        error?.error ||
        error?.message ||
        error?.response?.data?.error ||
        'Login failed';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl text-sm
    bg-[#eef4ee] text-green-900 placeholder-green-700
    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
  `;

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#eef4ee] px-4">
      <div
        className="
          w-full max-w-md
          bg-[#eef4ee] rounded-3xl p-8
          shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
        "
      >
        <h2 className="text-2xl font-semibold text-green-900 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-green-700 text-center mt-1">
          Sign in to continue
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={inputClass}
          />

          {err && (
            <div className="text-sm text-red-600 text-center">
              {err}
            </div>
          )}

          <button
            disabled={loading}
            className="
              w-full py-3 rounded-xl text-sm font-medium text-white
              bg-green-600
              shadow-[3px_3px_6px_#9fbfa2,-3px_-3px_6px_#dff1e2]
              hover:bg-green-700
              disabled:opacity-60
            "
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
}
