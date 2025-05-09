import API from "@/utils/api"
import { CustomOrder } from "@/utils/types";

export async function getAllOrders(): Promise<CustomOrder[]> {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-order/all`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
