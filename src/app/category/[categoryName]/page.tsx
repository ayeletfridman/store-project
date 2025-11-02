import { getProductsByCategory } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import gridStyles from "../../ProductsGrid.module.css";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const resolvedParams = await params;
  const encodedCategoryName = resolvedParams.categoryName;
  const categoryName = decodeURIComponent(encodedCategoryName);
  const products = await getProductsByCategory(categoryName);

  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}> {categoryName}</h1>
      <div className={gridStyles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
