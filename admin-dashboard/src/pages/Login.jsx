// path: src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err?.error ||
        err?.message ||
        err?.response?.data?.error ||
        'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        
        {/* ================= LEFT PANEL ================= */}
        <div className="hidden md:flex relative p-8 bg-gradient-to-br from-[#9fb9a6] to-[#6f8578] text-white">
          {/* Abstract shapes */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,#ffffff40,transparent_60%),radial-gradient(circle_at_70%_60%,#ffffff30,transparent_60%)]" />

          <div className="relative z-10 flex flex-col justify-between">
            <div className="text-sm tracking-wide opacity-80">
              ✳ Beyond the Possible
            </div>

            <h2 className="text-3xl font-semibold leading-snug max-w-sm">
              Explore a world of ideas <br />
              that transcend the <br />
              ordinary
            </h2>

            <p className="text-xs opacity-70 max-w-xs">
              Emptiness is not the absence; <br />
              it’s a space for something new.
            </p>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full text-center">
            <div className="text-2xl mb-2">✳</div>
            <h2 className="text-xl font-semibold text-gray-800">
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              or create an account
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4 text-left">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or username"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

              {error && (
                <div className="text-xs text-red-600">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium transition"
              >
                {loading ? 'Signing in…' : 'Enter'}
              </button>
            </form>

            <div className="mt-4 text-xs text-gray-500">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="mt-10 text-[11px] text-gray-400 flex justify-center gap-4">
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
