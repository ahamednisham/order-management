export default function AboutPage() {
  return (
    <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
        Thank you for trying this app
      </h1>
      <p className="mt-8 text-muted-foreground uppercase tracking-[0.2em] text-sm font-bold">
        Crafted with Gourmet.
      </p>
    </div>
  );
}
