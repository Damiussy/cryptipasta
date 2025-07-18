'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password reset email sent! Check your inbox and follow the instructions.');
      }
    } catch {
      setError('An error occurred while sending the reset email');
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
            <u>Forgot Password</u>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="auth-form">
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
              {loading ? 'Sending...' : 'Send Reset Email'}
            </span>
          </button>

          {/* Links */}
          <div className="auth-links">
            <p className="linear-textT-gradient bona-nova-sc-regular">
              Remember your password?{' '}
              <Link href="/auth/signin" className="liensMenu">
                Sign In
              </Link>
            </p>
            <p className="linear-textT-gradient bona-nova-sc-regular">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="liensMenu">
                Sign Up
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