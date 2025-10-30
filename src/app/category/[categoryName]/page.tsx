import { getProductsByCategory } from "@/services/api";
import ProductCard from "@/components/ProductCard";
// import { use } from 'react';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const resolvedParams = await params;

  const categoryName = resolvedParams.categoryName;

  const products = await getProductsByCategory(categoryName);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">
        קטגוריה: {categoryName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
