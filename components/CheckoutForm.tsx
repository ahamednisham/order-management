'use client';

import { useState, useEffect } from 'react';
import { DeliveryDetails } from '@/types';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CheckoutForm() {
  const { items, clearCart, setLastOrderId } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [details, setDetails] = useState<DeliveryDetails>({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/auth/profile')
        .then(res => res.json())
        .then(data => {
          setDetails({
            name: data.name || '',
            address: data.address || '',
            phone: data.phone || '',
          });
        })
        .catch(() => {});
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20 border border-border bg-card">
        <h2 className="text-3xl font-serif mb-8 text-foreground">Sign in to complete order</h2>
        <Link 
          href="/auth" 
          className="inline-block bg-foreground text-background px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          deliveryDetails: details,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const order = await response.json();
      clearCart();
      setLastOrderId(order.id);
      router.push(`/order-status/${order.id}`);
    } catch (_err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <section>
        <div className="flex items-center gap-4 mb-10">
          <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-serif text-lg">1</span>
          <h2 className="text-2xl font-serif font-medium text-foreground uppercase tracking-widest">Personal Information</h2>
        </div>
        
        <div className="space-y-8">
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Full Name</label>
            <input
              required
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="e.g. Johnathan Doe"
            />
          </div>
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Phone Number</label>
            <input
              required
              type="tel"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-10">
          <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-serif text-lg">2</span>
          <h2 className="text-2xl font-serif font-medium text-foreground uppercase tracking-widest">Delivery Address</h2>
        </div>
        
        <div className="space-y-8">
          <div className="border-b border-border pb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Shipping Address</label>
            <textarea
              required
              name="address"
              value={details.address}
              onChange={handleChange}
              rows={2}
              className="w-full bg-transparent text-xl font-serif text-foreground outline-none placeholder:text-muted-foreground/30 resize-none"
              placeholder="123 Metropolitan Avenue, Suite 405"
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <button
        disabled={loading || items.length === 0}
        type="submit"
        className="w-full bg-foreground text-background py-6 text-sm uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Complete Order'}
      </button>
    </form>
  );
}
