import axios from "axios";

export const updateQuantityAPI = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${userId}`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return null;
  }
};
