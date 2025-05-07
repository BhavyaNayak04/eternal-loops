import axios from "axios";

export const getCount = async (userId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/count/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.itemCount;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
};
