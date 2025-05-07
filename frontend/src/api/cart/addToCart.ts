import axios from "axios";

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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add/${userId}`,
      {
        productId,
        quantity,
      }
    );
    console.log("Add to cart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export default addToCart;
