'use client';

import { Order, OrderStatus as StatusType } from '@/types';
import { CheckCircle2, Clock, Truck, LucideIcon, Utensils } from 'lucide-react';

interface OrderStatusProps {
  order: Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const steps: { status: StatusType; icon: LucideIcon; label: string }[] = [
    { status: 'Order Received', icon: Clock, label: 'Order Received' },
    { status: 'Preparing', icon: Utensils, label: 'Preparing Your Food' },
    { status: 'Out for Delivery', icon: Truck, label: 'Out for Delivery' },
    { status: 'Delivered', icon: CheckCircle2, label: 'Delivered' },
  ];

  const getStatusIndex = (status: StatusType) => {
    return steps.findIndex((step) => step.status === status);
  };

  const currentIndex = getStatusIndex(order.status);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
      {/* Receipt Column */}
      <div className="lg:col-span-7 flex flex-col">
        <div className="bg-card p-10 border border-border shadow-sm">
          <div className="flex justify-between items-baseline border-b border-border pb-8 mb-8">
            <h2 className="text-3xl font-serif text-foreground">Receipt</h2>
            <span className="text-sm text-muted-foreground font-light">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="space-y-10 mb-10 border-b border-border pb-10">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start group">
                <div className="flex gap-6">
                  <span className="font-serif text-muted-foreground text-xl pt-0.5">{item.quantity}x</span>
                  <div>
                    <p className="text-xl font-serif text-foreground">{item.name}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Special Preparation</p>
                  </div>
                </div>
                <span className="text-xl font-serif text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground font-medium">
              <span>Subtotal</span>
              <span>${(order.total - 5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground font-medium">
              <span>Delivery</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between items-center pt-6 text-3xl font-serif text-foreground">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Column */}
      <div className="lg:col-span-5">
        <div className="sticky top-32">
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-muted-foreground mb-12">Track Progress</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-16 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={step.status} className="flex items-center group">
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-foreground border-foreground text-background' 
                        : 'bg-background border-border text-muted-foreground'
                    }`}>
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="ml-8">
                      <h4 className={`text-sm uppercase tracking-widest font-bold transition-colors duration-500 ${
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.label}
                      </h4>
                      {isCurrent && order.status !== 'Delivered' && (
                        <p className="text-accent text-[10px] uppercase tracking-widest font-bold mt-2 animate-pulse">
                          In Progress
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-border">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-bold">Delivery Destination</h3>
            <p className="text-xl font-serif text-foreground mb-1">{order.deliveryDetails.name}</p>
            <p className="text-muted-foreground font-light leading-relaxed">{order.deliveryDetails.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
