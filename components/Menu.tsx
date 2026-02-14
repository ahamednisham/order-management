'use client';

import { MenuItem } from '@/types';
import MenuItemCard from './MenuItemCard';

interface MenuProps {
  items: MenuItem[];
}

export default function Menu({ items }: MenuProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
