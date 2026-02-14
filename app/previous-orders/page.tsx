'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Loader2, Package } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import OrderHistoryItem from '@/components/OrderHistoryItem';

export default function PreviousOrdersPage() {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          setOrders(data.sort((a: Order, b: Order) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
          Please login to view your orders
        </h1>
        <Link 
          href="/auth" 
          className="bg-foreground text-background px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Fetching your history..." />;
  }

  return (
    <div className="py-12 md:py-20">
      <header className="mb-16 md:mb-24">
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-foreground mb-4">
          Previous Orders
        </h1>
        <p className="text-muted-foreground font-light text-lg">
          Review your culinary journey with Gourmet.
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border">
          <Package className="mx-auto text-muted-foreground mb-6" size={48} strokeWidth={1} />
          <h2 className="text-2xl font-serif mb-6 text-foreground">No orders yet</h2>
          <Link href="/" className="text-sm uppercase tracking-widest font-bold hover:underline">
            Explore our Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
