import API from "@/utils/api";
import { Product } from "@/utils/types";

type FormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
};

export async function update(
  productId: string,
  formData: FormData
): Promise<{ success: boolean; message: string; product: Product[] }> {
  try {
    const response = await API.put(
      `${process.env.NEXT_PUBLIC_API_URL}/products/update/${productId}`,
      formData
    );
    console.log(response.data);
    return {
      success: true,
      message: "Product updated successfully",
      product: response.data.product,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Error updating product",
      product: [],
    };
  }
}
