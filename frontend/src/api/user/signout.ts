import API from "@/utils/api";

export const signout = async (
  token: string
): Promise<{ message: string; success: boolean }> => {
  try {
    const response = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return {
      message: response.data.message,
      success: response.data.success,
    };
  } catch (error) {
    console.error("Error during signout:", error);
    return {
      message: "Error during signout",
      success: false,
    };
  }
};
