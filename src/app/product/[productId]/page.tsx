import { getProductById } from "@/services/api";
import Image from "next/image";
import ProductActions from "../../../components/ProductActions";

export default async function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-contain max-h-[500px]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-gray-500">{product.category}</span>
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <p className="text-lg text-gray-700">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-500">
            (Rating: {product.rating.rate} / 5)
          </span>
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
}
