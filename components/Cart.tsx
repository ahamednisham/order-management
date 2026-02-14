'use client';

import { useCart } from '@/context/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border">
        <h2 className="text-2xl font-serif mb-6 text-foreground">Your tray is empty</h2>
        <Link href="/" className="text-sm uppercase tracking-widest font-bold hover:underline">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card p-10 border border-border">
      <h2 className="text-3xl font-serif text-foreground mb-10 border-b border-border pb-6">Your Tray</h2>
      <div className="space-y-10 mb-10">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start group">
            <div className="flex gap-6">
              <span className="font-serif text-muted-foreground text-xl pt-0.5">{item.quantity}x</span>
              <div>
                <p className="text-xl font-serif text-foreground leading-tight">{item.name}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xl font-serif text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-10 space-y-4">
        <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground">
          <span>Delivery</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between items-center pt-6 text-2xl font-serif text-foreground">
          <span>Total</span>
          <span>${(totalPrice + 5).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
