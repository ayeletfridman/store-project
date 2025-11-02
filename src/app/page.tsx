import { getProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import gridStyles from "./ProductsGrid.module.css";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <h1>המוצרים שלנו</h1>
      <div className={gridStyles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
