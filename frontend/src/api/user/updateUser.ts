import { User } from "@/utils/types";
import API from "@/utils/api";

export const getProfile = async (
  userId: string,
  contactNumber: string,
  address: string
): Promise<User> => {
  try {
    const response = await API.put(
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
