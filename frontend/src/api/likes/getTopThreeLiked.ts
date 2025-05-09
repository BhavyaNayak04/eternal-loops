import API from "@/utils/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  inStock: boolean;
  __v: number;
}

export interface TopLikedProduct {
  likeCount: number;
  product: Product;
}

type TopLikedProductsResponse = TopLikedProduct[];

export const getTopThreeLiked = async (): Promise<TopLikedProductsResponse> => {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/likes/top`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return [];
  }
};
