import axios from "axios";

interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  userId?: string;
}

export async function register(formData: {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
}): Promise<RegisterResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      formData
    );

    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred during registration",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred during registration",
      };
    }
  }
}
