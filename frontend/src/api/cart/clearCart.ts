import API from "@/utils/api"

export const clearCart = async (userId: string) => {
  try {
    const response = await API.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/clear/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
};
