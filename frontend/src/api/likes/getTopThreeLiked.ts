import { Product } from "@/types/index";
import axios from "axios";

export const getTopThreeLiked = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/top`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return [];
  }
};
