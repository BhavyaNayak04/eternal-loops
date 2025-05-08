import axios from "axios";

interface SignInResponse {
  success: boolean;
  message: string;
  userId: string;
  token?: string;
}

export async function signIn(
  email: string,
  password: string
): Promise<SignInResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      if (e.response.status === 401) {
        return {
          success: false,
          message: e.response.data.message || "Unauthorized",
          userId: "",
          token: undefined,
        };
      }
    }
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unknown error",
      userId: "",
      token: undefined,
    };
  }
}
