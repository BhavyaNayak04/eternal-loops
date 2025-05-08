import { Product } from "@/types";
import axios from "axios";

export const getAllLikedProducts = async (
  userId: string
): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/user/${userId}`,
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
