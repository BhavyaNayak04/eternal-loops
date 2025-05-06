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
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
      userId: response.data.userId,
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      success: false,
      message: "An error occurred during login",
      userId: "",
      token: undefined,
    };
  }
}
