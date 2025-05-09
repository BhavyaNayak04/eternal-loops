import API from "@/utils/api";
import { Product } from "@/utils/types";

type FormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
};

export async function add(
  formData: FormData
): Promise<{ success: boolean; message: string; product: Product }> {
  try {
    const response = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products/add`,
      formData
    );
    console.log(response.data);
    return {
      success: true,
      message: "Product added successfully",
      product: response.data.product,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      success: false,
      message: "Error adding product",
      product: {} as Product,
    };
  }
}
