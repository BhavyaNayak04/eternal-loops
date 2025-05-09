import API from "@/utils/api"

export const getCart = async (userId: string) => {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`,
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
