import { User } from "@/types";
import axios from "axios";

export const getProfile = async (
  userId: string,
  contactNumber: string,
  address: string
): Promise<User> => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
      {
        contactNumber,
        address,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return {} as User;
  }
};
