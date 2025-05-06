export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  price: number;
  inStock: boolean;
}

export const categories = [
  { id: "animal", name: "Animals" },
  { id: "accessory", name: "Accessories" },
  { id: "keychain", name: "Keychains" },
  { id: "mat", name: "Mats & Rugs" },
];

// Price ranges for filtering
export const priceRanges = [
  { id: "under20", name: "Under $20", min: 0, max: 20 },
  { id: "20to50", name: "$20 to $50", min: 20, max: 50 },
  { id: "over50", name: "Over $50", min: 50, max: 1000 },
];
