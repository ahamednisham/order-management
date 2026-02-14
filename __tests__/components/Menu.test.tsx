import { render, screen } from '@testing-library/react';
import Menu from '../../components/Menu';
import { CartProvider } from '../../context/CartContext';
import { MenuItem } from '../../types';

const mockItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pizza',
    description: 'Yummy',
    price: 10,
    image: '/pizza.jpg',
    category: 'Main Course',
  },
];

// Mock useCart if needed or just use the Provider
describe('Menu Component', () => {
  it('renders menu items', () => {
    render(
      <CartProvider>
        <Menu items={mockItems} />
      </CartProvider>
    );

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to tray/i })).toBeInTheDocument();
  });
});
