import API from "@/utils/api";
interface ProductStockResponse {
  stock: number;
}
export async function fetchProductStock(
  id: string
): Promise<ProductStockResponse> {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/stock/${id}`
    );
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject("Failed to fetch product details.");
  }
}
