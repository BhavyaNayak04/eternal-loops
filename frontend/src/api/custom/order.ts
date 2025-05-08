import axios from "axios";

interface Response {
  message: string;
  success: boolean;
}

interface Order {
  userId: string;
  name: string;
  description: string;
  deadline: string;
  referenceImage?: string;
  inspirationLink?: string;
}

export const order = async (formData: Order): Promise<Response> => {
  try {
    const payload: Order = {
      userId: formData.userId,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
    };

    if (formData.referenceImage) {
      payload.referenceImage = formData.referenceImage;
    }

    if (formData.inspirationLink) {
      payload.inspirationLink = formData.inspirationLink;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-orders/add`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      message: response.data.message,
      success: true,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("AxiosError", error);
      return {
        message: error.response?.data?.message || "An error occurred",
        success: false,
      };
    } else {
      console.error("Unknown Error", error);
      return {
        message: "An unknown error occurred",
        success: false,
      };
    }
  }
};
