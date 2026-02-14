import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella core',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop',
    category: 'Starters',
  },
  {
    id: '2',
    name: 'Burrata & Heirloom Tomato',
    description: 'Creamy burrata, balsamic glaze, and fresh basil oil',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop',
    category: 'Starters',
  },
  
  // Main Course
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    category: 'Main Course',
  },
  {
    id: '4',
    name: 'Pan-Seared Sea Bass',
    description: 'Wild-caught sea bass with lemon-butter caper sauce',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    category: 'Main Course',
  },
  {
    id: '5',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice with porcini mushrooms and aged parmesan',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    category: 'Main Course',
  },
  {
    id: '6',
    name: 'Angus Ribeye Steak',
    description: 'Grass-fed beef with roasted garlic and rosemary butter',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    category: 'Main Course',
  },

  // Salads
  {
    id: '7',
    name: 'Kale & Quinoa Power Bowl',
    description: 'Avocado, toasted seeds, and lemon-tahini dressing',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    category: 'Salads',
  },
  {
    id: '8',
    name: 'Chicken Caesar Salad',
    description: 'Grilled chicken, romaine lettuce, croutons, and parmesan',
    price: 11.25,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    category: 'Salads',
  },

  // Desserts
  {
    id: '9',
    name: 'Dark Chocolate Fondant',
    description: 'Molten center cake with Tahitian vanilla bean gelato',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    category: 'Desserts',
  },
  {
    id: '10',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked ladyfingers with mascarpone cream',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    category: 'Desserts',
  },

  // Beverages
  {
    id: '11',
    name: 'Hibiscus Iced Tea',
    description: 'House-brewed with honey and fresh mint',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    category: 'Beverages',
  },
  {
    id: '12',
    name: 'Sparkling Elderflower',
    description: 'Chilled soda with elderflower syrup and lime',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop',
    category: 'Beverages',
  },
];
