import { User } from "@/utils/types";
import API from "@/utils/api";

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return {} as User;
  }
};
