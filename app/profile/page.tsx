'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, Save, LogOut } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }

    fetch('/api/auth/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      
      setMessage('Profile updated successfully');
    } catch (_err) {
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Retrieving your profile..." />;
  }

  return (
    <div className="py-12 md:py-20 max-w-2xl mx-auto">
      <header className="mb-16 md:mb-24">
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-foreground mb-4">
          Profile
        </h1>
        <p className="text-muted-foreground font-light text-lg">
          Manage your personal information for a faster checkout.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="space-y-12">
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="John Doe"
            />
          </div>
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Default Address</label>
            <textarea
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              rows={2}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30 resize-none"
              placeholder="123 Metropolitan Avenue..."
            />
          </div>
        </div>

        {message && (
          <p className={`text-sm font-medium text-center ${message.includes('Error') ? 'text-destructive' : 'text-accent'}`}>
            {message}
          </p>
        )}

        <div className="space-y-6">
          <button
            disabled={saving}
            type="submit"
            className="w-full bg-foreground text-background py-6 text-sm uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full border border-border py-6 text-sm uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-destructive hover:border-destructive transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </form>
    </div>
  );
}
