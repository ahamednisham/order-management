'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      authLogin(email);
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 md:py-32 max-w-md mx-auto">
      <header className="text-center mb-16">
        <h1 className="font-serif text-5xl font-medium text-foreground mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        <p className="text-muted-foreground font-light text-lg">
          {isLogin ? 'Welcome back to Gourmet.' : 'Join the Gourmet. experience.'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-8">
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="email@example.com"
            />
          </div>
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm font-medium text-center">{error}</p>
        )}

        <div className="space-y-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-foreground text-background py-6 text-sm uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
