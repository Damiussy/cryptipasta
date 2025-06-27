'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            full_name: username || email.split('@')[0],
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Account created successfully! Check your email to confirm your account.');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      }
    } catch {
      setError('An error occurred while signing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {/* Header */}
        <div className="auth-header">
          <h1 className="linear-text-gradient sixtyfour-convergence-title auth-title">
            קריפטיפסטה
          </h1>
          <div className="barSectioning"></div>
          <h2 className="linear-text-gradient bona-nova-sc-bold auth-subtitle">
            <u>Create an account</u>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="linear-textT-gradient bona-nova-sc-regular">
              Username *
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              placeholder="Your username..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="linear-textT-gradient bona-nova-sc-regular">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="linear-textT-gradient bona-nova-sc-regular">
              Password *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="linear-textT-gradient bona-nova-sc-regular">
              Confirm password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="auth-message error">
              <span className="linear-text-gradient">{error}</span>
            </div>
          )}

          {message && (
            <div className="auth-message success">
              <span className="linear-text-gradient">{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            <span className="linear-text-gradient bona-nova-sc-bold">
              {loading ? 'Loading...' : 'Create your account'}
            </span>
          </button>

          {/* Links */}
          <div className="auth-links">
            <p className="linear-textT-gradient bona-nova-sc-regular">
              Already have an account?{' '}
              <Link href="/auth/signin" className="liensMenu">
                Sign In
              </Link>
            </p>
            <p className="linear-textT-gradient bona-nova-sc-regular">
              <Link href="/" className="liensMenu">
                ← Back to the home page
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}