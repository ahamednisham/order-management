import Menu from "@/components/Menu";
import { MENU_ITEMS } from "@/lib/data";

export default function Home() {
  return (
    <div className="py-12 md:py-20">
      <section className="mb-16 md:mb-24 text-left max-w-4xl">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
          Seasonal Menu
        </p>
        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6 text-foreground">
          Simplicity is the ultimate <br/> sophistication.
        </h1>
        <p className="text-muted-foreground max-w-lg text-lg font-light leading-relaxed">
          Our chef curates a daily selection of dishes focusing on organic, locally sourced ingredients prepared with minimal intervention.
        </p>
      </section>
      
      <section>
        <div className="flex gap-8 overflow-x-auto pb-4 hide-scroll border-b border-border mb-16">
          <button className="text-foreground font-medium text-sm pb-4 border-b-2 border-foreground whitespace-nowrap">All Items</button>
          <button className="text-muted-foreground hover:text-foreground font-medium text-sm pb-4 whitespace-nowrap transition-colors">Starters</button>
          <button className="text-muted-foreground hover:text-foreground font-medium text-sm pb-4 whitespace-nowrap transition-colors">Main Course</button>
          <button className="text-muted-foreground hover:text-foreground font-medium text-sm pb-4 whitespace-nowrap transition-colors">Salads</button>
          <button className="text-muted-foreground hover:text-foreground font-medium text-sm pb-4 whitespace-nowrap transition-colors">Desserts</button>
          <button className="text-muted-foreground hover:text-foreground font-medium text-sm pb-4 whitespace-nowrap transition-colors">Beverages</button>
        </div>
        <Menu items={MENU_ITEMS} />
      </section>
    </div>
  );
}
