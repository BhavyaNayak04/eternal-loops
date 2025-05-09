import axios from "axios";
import API from "@/utils/api";

interface RegisterResponse {
  success: boolean;
  message: string;
  status: number;
}

export async function registerEmail(email: string): Promise<RegisterResponse> {
  try {
    const response = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter/register`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred during registration",
        status: error.response?.status || 500,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred during registration",
        status: 500,
      };
    }
  }
}
