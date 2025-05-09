import API from "@/utils/api";

interface ToggleLikeResponse {
  message: string;
  success: boolean;
}

export const toggleLike = async (
  userId: string,
  productId: string,
  action: string
): Promise<ToggleLikeResponse> => {
  try {
    const response = await API.post(
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
    return {
      message: response.data.message,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return {
      message: "Error toggling like",
      success: false,
    };
  }
};
