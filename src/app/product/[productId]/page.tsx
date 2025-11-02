import { getProductById } from "@/services/api";
import Image from "next/image";
import ProductActions from "@/components/ProductActions";
import styles from "./ProductPage.module.css";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>We couldn't find this product</p>
      </div>
    );
  }

  return (
    <div className={styles.pageGrid}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
      </div>

      <div className={styles.detailsWrapper}>
        <span className={styles.category}>{product.category}</span>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceBox}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className={styles.rating}>
              (Rating: {product.rating.rate} / 5)
            </span>
          )}
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
}
