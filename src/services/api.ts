import { Product } from "@/types"; 

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product. Status: ${res.status}`);
  }

  const text = await res.text();

  if (!text) {
    throw new Error(
      "Failed to fetch product. Received empty response from API."
    );
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Failed to parse product data from API.");
  }
}
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/products/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const text = await res.text();
  if (!text) {
    return [];
  }

  try {
    const categories: string[] = JSON.parse(text);

    return categories.filter((category) => category && category.trim() !== "");
  } catch (error) {
    console.error("Failed to parse JSON for categories:", text);
    return [];
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}
