import axios from "axios";
import { Product } from "@/types/index";

export async function getAllProducts(userId: string): Promise<Product[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/all/${userId}`
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
