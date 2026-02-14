import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cart from '../../components/Cart';
import { CartProvider, useCart } from '../../context/CartContext';
import { MenuItem } from '../../types';

const mockItem: MenuItem = {
  id: '1',
  name: 'Pizza',
  description: 'Yummy',
  price: 10,
  image: '/pizza.jpg',
  category: 'Main Course',
};

const TestWrapper = () => {
  const { addToCart } = useCart();
  return (
    <>
      <button onClick={() => addToCart(mockItem)}>Add Pizza</button>
      <Cart />
    </>
  );
};

describe('Cart Component', () => {
  it('renders empty tray message when no items', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText(/your tray is empty/i)).toBeInTheDocument();
  });

  it('renders cart items and total after adding', async () => {
    render(
      <CartProvider>
        <TestWrapper />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));

    expect(screen.getByText('1x')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    // Total includes $5 delivery fee in the new design
    expect(screen.getByText('$15.00')).toBeInTheDocument();
  });

  it('updates quantity and total', () => {
    render(
      <CartProvider>
        <TestWrapper />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));
    
    // Test increment
    const plusButton = screen.getAllByRole('button').find(b => b.innerHTML.includes('lucide-plus'));
    if (plusButton) fireEvent.click(plusButton);

    expect(screen.getByText('2x')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });
});
