'use client';

import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart, updateQuantity, items } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group flex flex-col">
      <div className="bg-card rounded-sm aspect-[5/4] mb-6 overflow-hidden relative flex items-center justify-center border border-border/50">
        {quantity > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] font-bold h-6 w-6 rounded-full flex items-center justify-center shadow-sm">
            {quantity}
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="w-4/5 h-4/5 object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {quantity > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(item.id, quantity - 1);
              }}
              aria-label="Remove from tray"
              className="w-10 h-10 flex items-center justify-center bg-white text-foreground rounded-full shadow-lg hover:bg-foreground hover:text-background transition-colors"
            >
              <Minus size={20} strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            aria-label="Add to tray"
            className="w-10 h-10 flex items-center justify-center bg-white text-foreground rounded-full shadow-lg hover:bg-foreground hover:text-background transition-colors"
          >
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif font-medium text-foreground tracking-tight">
          {item.name}
        </h3>
        <span className="text-lg font-serif text-foreground">
          ${item.price.toFixed(2)}
        </span>
      </div>
      
      <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">
        {item.description}
      </p>
    </div>
  );
}
