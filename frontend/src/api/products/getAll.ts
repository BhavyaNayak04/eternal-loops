import axios from "axios";
import { Products } from "@/types/index";

export async function getAllProducts(): Promise<Products[]> {
  try {
    const response = await axios.get("http://localhost:5000/api/products/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
