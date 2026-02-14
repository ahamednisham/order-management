'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Truck, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { totalItems, lastOrderId } = useCart();
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [orderActive, setOrderActive] = useState(false);

  useEffect(() => {
    if (!lastOrderId) {
      return;
    }

    let cancelled = false;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/orders/${lastOrderId}`);
        if (!cancelled) {
          if (res.ok) {
            const order = await res.json();
            setOrderActive(order.status !== 'Delivered');
          } else {
            setOrderActive(false);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setOrderActive(false);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [lastOrderId]);

  const isOrderActive = !!lastOrderId && orderActive;

  const showTrackButton =
    isOrderActive && !pathname.includes(`/order-status/${lastOrderId}`);

  const navLinks = [
    { name: 'Menu', href: '/' },
    { name: 'Previous Orders', href: '/previous-orders' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-3xl font-serif italic font-bold tracking-tight">
              Gourmet.
            </Link>
            <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors cursor-pointer pb-0.5 ${
                      isActive
                        ? 'text-foreground border-b-2 border-foreground' 
                        : 'hover:text-foreground border-b-2 border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className={`text-muted-foreground hover:text-foreground transition-colors p-1 ${pathname === '/profile' ? 'text-foreground' : ''}`}
                  title="Profile"
                >
                  <User size={24} strokeWidth={1.5} />
                </Link>
              </div>
            ) : (
              <Link
                href="/auth"
                className={`text-muted-foreground hover:text-foreground transition-colors p-1 ${pathname === '/auth' ? 'text-foreground' : ''}`}
                title="Login / Register"
              >
                <User size={24} strokeWidth={1.5} />
              </Link>
            )}

            {showTrackButton && (
              <Link href={`/order-status/${lastOrderId}`} className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-xs uppercase tracking-widest font-bold">
                <Truck size={16} />
                <span>Track Order</span>
              </Link>
            )}

            <Link href="/cart" className="relative group p-1 text-muted-foreground hover:text-foreground transition-opacity">
              <ShoppingBag size={24} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="bg-foreground text-background text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
