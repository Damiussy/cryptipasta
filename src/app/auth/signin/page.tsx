'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou mot de passe incorrect');
      } else {
        // Connexion réussie
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('Une erreur est survenue lors de la connexion');
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
            <u>Se connecter</u>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="auth-form">
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
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="linear-textT-gradient bona-nova-sc-regular">
              Mot de passe *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="auth-message error">
              <span className="linear-text-gradient">❌ {error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            <span className="linear-text-gradient bona-nova-sc-bold">
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </span>
          </button>

          {/* Forgot Password Link */}
          <div className="auth-links">
            <p className="linear-textT-gradient bona-nova-sc-regular">
              <Link href="/auth/forgot-password" className="liensMenu">
                Mot de passe oublié ?
              </Link>
            </p>
          </div>

          <div className="barSectioning2"></div>

          {/* Sign Up Link */}
          <div className="auth-links">
            <p className="linear-textT-gradient bona-nova-sc-regular">
              Pas encore de compte ?{' '}
              <Link href="/auth/signup" className="liensMenu">
                Créer un compte
              </Link>
            </p>
            <p className="linear-textT-gradient bona-nova-sc-regular">
              <Link href="/" className="liensMenu">
                ← Retour à l'accueil
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="auth-container">
        <div className="auth-content">
          <div className="linear-text-gradient">Chargement...</div>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}