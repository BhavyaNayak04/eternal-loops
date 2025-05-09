import API from "@/utils/api";

export const getLikesCount = async (productId: string): Promise<number> => {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/count/${productId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.likeCount;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
};
