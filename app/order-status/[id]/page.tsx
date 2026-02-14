'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Order } from '@/types';
import OrderStatus from '@/components/OrderStatus';
import Link from 'next/link';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OrderStatusPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (_err) {
        setError('Order not found or something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    
    // Poll for status updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Locating your order details..." />;
  }

  if (error || !order) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-serif text-foreground mb-4">{error}</h2>
        <Link href="/" className="text-sm uppercase tracking-widest font-bold hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="flex flex-col items-center justify-center text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-4">
          {order.status === 'Delivered' ? 'Order Delivered' : 'Thank you for your order'}
        </h1>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Order #{order.id.slice(-4).toUpperCase()}
          {order.status !== 'Delivered' && ' • Confirmed'}
        </p>
      </div>

      <OrderStatus order={order} />
      
      <div className="mt-20 text-center">
        <Link href="/" className="text-sm uppercase tracking-[0.3em] font-bold text-foreground border-b border-foreground pb-2 hover:opacity-70 transition-opacity">
          Back to Menu
        </Link>
      </div>
    </div>
  );
}
