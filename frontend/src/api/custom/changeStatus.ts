import API from "@/utils/api";

export async function changeStatus(
  orderId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.put(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-orders/${orderId}/status`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}
