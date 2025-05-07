import axios from "axios";
interface ProductStockResponse {
    stock: number;
}
export async function fetchProductStock(id: string): Promise<ProductStockResponse> {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/stock/${id}`
    );
    console.log("Product details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject("Failed to fetch product details.");
  }
}
