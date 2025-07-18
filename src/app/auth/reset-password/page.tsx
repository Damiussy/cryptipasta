'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState<{ user: { id: string } } | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    // Check if user has a valid session (from reset link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new password reset.');
      } else {
        setSession(session);
      }
    };
    
    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setError('Invalid session. Please request a new password reset.');
      return;
    }

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
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password updated successfully! Redirecting to sign in...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      }
    } catch {
      setError('An error occurred while updating your password');
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
            <u>Reset Password</u>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="auth-form">
          <div className="form-group">
            <label htmlFor="password" className="linear-textT-gradient bona-nova-sc-regular">
              New Password *
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
              Confirm New Password *
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
            disabled={loading || !session}
            className="auth-button"
          >
            <span className="linear-text-gradient bona-nova-sc-bold">
              {loading ? 'Updating...' : 'Update Password'}
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