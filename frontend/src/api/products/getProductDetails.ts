import API from "@/utils/api";
import { Product } from "@/utils/types";

export async function fetchProdcuctDetails(
  productId: string,
  userId: string
): Promise<Product> {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/get/${productId}/${userId}`
    );
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject("Failed to fetch product details.");
  }
}
