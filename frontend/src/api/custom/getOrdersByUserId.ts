import { CustomOrder } from "@/utils/types";
import API from "@/utils/api";

export async function getOrdersByUserId(
  userId: string
): Promise<CustomOrder[]> {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-orders/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
