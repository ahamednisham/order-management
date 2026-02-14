import * as dotenv from 'dotenv';
dotenv.config();

async function seed() {
  const { db } = await import('./index');
  const { menuItems } = await import('./schema');
  const { MENU_ITEMS } = await import('../data');

  console.log('Seeding menu items...');
  for (const item of MENU_ITEMS) {
    await db.insert(menuItems).values({
      ...item,
      price: item.price.toString(),
    }).onConflictDoUpdate({
      target: menuItems.id,
      set: {
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        image: item.image,
        category: item.category,
      }
    });
  }
  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
