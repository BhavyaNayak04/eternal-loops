import API from "@/utils/api";
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
    const response = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true } //for refresh token cookie
    );

    const authHeader = response.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : "";

    return {
      success: true,
      message: response.data.message,
      userId: response.data.userId,
      role: response.data.role,
      token,
    };
  } catch (e: unknown) {
    console.error("Error during sign-in:", e);
    return {
      success: false,
      message: "Invalid credentials",
      userId: "",
      role: "",
      token: "",
    };
  }
}
