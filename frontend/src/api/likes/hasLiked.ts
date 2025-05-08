import axios from "axios";

export const hasLiked = async (
  userId: string,
  productId: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/hasLiked/${userId}/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.liked;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return false;
  }
};
