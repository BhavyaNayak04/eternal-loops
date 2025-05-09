import API from "@/utils/api"

export const removeFromCart = async (userId: string, productId: string) => {
  try {
    const response = await API.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return "Error fetching cart count";
  }
};
