import Cart from "@/components/Cart";
import CheckoutForm from "@/components/CheckoutForm";

export default function CartPage() {
  return (
    <div className="py-12 md:py-20">
      <header className="mb-16 md:mb-24 text-left max-w-2xl mx-auto md:mx-0">
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-4">Checkout</h1>
        <p className="text-muted-foreground font-light text-lg">Complete your details below to place your order.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-5">
          <Cart />
        </div>
      </div>
    </div>
  );
}
