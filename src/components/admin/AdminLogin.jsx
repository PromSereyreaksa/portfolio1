import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const adminPath = import.meta.env.VITE_ADMIN_PATH;

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to admin dashboard
      navigate(`/${adminPath}/dashboard`);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-thin tracking-[0.3em] text-black mb-4">
            ADMIN
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 tracking-wide">
            Secure Area - Authorization Required
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2 tracking-wide">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2 tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors text-sm tracking-widest"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        {/* Back to Portfolio */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-black transition-colors tracking-wide"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
