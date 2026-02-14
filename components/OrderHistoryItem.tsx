'use client';

import { Order } from '@/types';
import Link from 'next/link';

interface OrderHistoryItemProps {
  order: Order;
}

export default function OrderHistoryItem({ order }: OrderHistoryItemProps) {
  return (
    <div className="bg-card border border-border p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-muted/30 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm uppercase tracking-widest font-bold text-accent">
            {order.status}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            #{order.id.slice(-4).toUpperCase()}
          </span>
        </div>
        <h3 className="text-2xl font-serif text-foreground">
          {order.items.map(i => i.name).join(', ')}
        </h3>
        <p className="text-muted-foreground text-sm font-light">
          {new Date(order.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      
      <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-6">
        <span className="text-3xl font-serif text-foreground">${order.total.toFixed(2)}</span>
        <Link 
          href={`/order-status/${order.id}`}
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
