import axios from "axios";
import API from "@/utils/api"
interface AddToCartResponse {
  success: boolean;
  message: string;
}
async function addToCart(
  userId: string,
  productId: string,
  quantity: number
): Promise<AddToCartResponse> {
  try {
    const response = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add/${userId}`,
      {
        productId,
        quantity,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || "An error occurred",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
}

export default addToCart;
