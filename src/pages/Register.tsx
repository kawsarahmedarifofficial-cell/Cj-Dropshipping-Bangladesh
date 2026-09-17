import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { signInWithGoogle } from '../lib/auth';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 bg-[#f8f9fa]">
      <div className="bg-white p-8 md:p-10 rounded shadow-sm w-full max-w-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Create an account.</h1>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Shop Name"
              required
            />
          </div>
          
          <div>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Full Name"
              required
            />
          </div>
          
          <div>
            <input 
              type="tel" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Phone"
              required
            />
          </div>

          <div>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Address"
              required
            />
          </div>

          <div>
            <input 
              type="email" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input 
              type="password" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Password"
              required
            />
          </div>
          
          <div>
            <input 
              type="password" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="flex items-center mt-2">
            <input id="terms" type="checkbox" className="h-4 w-4 text-[#28a745] focus:ring-[#28a745] border-gray-300 rounded cursor-pointer accent-[#28a745]" required />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-500 cursor-pointer">
              By signing up you agree to our terms and conditions.
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-medium py-3 rounded transition-colors mt-4 text-sm"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {loading ? 'Creating Account...' : 'Sign up with Google'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?<br/>
          <Link to="/login" className="text-[#28a745] hover:underline mt-1 inline-block">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
