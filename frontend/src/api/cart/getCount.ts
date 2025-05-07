import axios from "axios";

export const getCount = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/cart/count/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.count;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
};
