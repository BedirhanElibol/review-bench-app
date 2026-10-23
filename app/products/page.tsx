import { prisma } from '@/lib/db';

export default async function ProductsPage() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    product.reviews = await prisma.review.findMany({ where: { productId: product.id } });
  }
  return <ProductGrid products={products} />;
}
