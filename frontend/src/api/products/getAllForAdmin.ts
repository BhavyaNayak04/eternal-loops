import API from "@/utils/api";
import { Product } from "@/utils/types";

export async function getAllForAdmin(): Promise<Product[]> {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/getAll`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
