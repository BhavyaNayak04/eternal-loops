import API from "@/utils/api";

export async function revokeOrder(
  orderId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-orders/revoke/${orderId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}
