import axios from "axios";

export const toggleLike = async (
  userId: string,
  productId: string,
  action: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/toggleLike`,
      {
        userId: userId,
        productId: productId,
        action: action,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return "Error fetching cart count";
  }
};
