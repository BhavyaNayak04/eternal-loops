import { User } from "@/types";
import axios from "axios";

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return {} as User;
  }
};
