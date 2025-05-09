import axios from "axios";

interface SignInResponse {
  success: boolean;
  message: string;
  userId: string;
  role: string;
  token: string;
}

export async function signIn(
  email: string,
  password: string
): Promise<SignInResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true } //for refresh token cookie
    );

    const authHeader = response.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : "";
    console.log("Token:", token);
    return {
      success: true,
      message: response.data.message,
      userId: response.data.userId,
      role: response.data.role,
      token,
    };
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      if (e.response.status === 401) {
        return {
          success: false,
          message: e.response.data.message || "Unauthorized",
          userId: "",
          role: "",
          token: "",
        };
      }
    }
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unknown error",
      userId: "",
      role: "",
      token: "",
    };
  }
}
