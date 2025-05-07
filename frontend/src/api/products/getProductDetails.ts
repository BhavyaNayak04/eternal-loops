import axios from "axios";
import { Product } from "@/types/index";

export async function fetchProdcuctDetails(id: string): Promise<Product> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/get/${id}`
    );
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject("Failed to fetch product details.");
  }
}
