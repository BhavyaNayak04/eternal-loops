export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  price: number;
  inStock: boolean;
  quantity: number;
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

// navigation
export const navigation = {
  categories: [
    {
      id: "crochet-toys",
      name: "Crochet Toys",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc: "https://example.com/images/crochet-toys-new.jpg",
          imageAlt: "Handmade crochet plush toys displayed on a table.",
        },
        {
          name: "Best Sellers",
          href: "#",
          imageSrc: "https://example.com/images/crochet-toys-best.jpg",
          imageAlt: "Popular crochet plushies loved by customers.",
        },
      ],
      sections: [
        {
          id: "animals",
          name: "Animals",
          items: [
            { name: "Bears", href: "#" },
            { name: "Bunnies", href: "#" },
            { name: "Cats & Dogs", href: "#" },
            { name: "Dinosaurs", href: "#" },
            { name: "Fantasy Creatures", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "dolls",
          name: "Dolls",
          items: [
            { name: "Mini Dolls", href: "#" },
            { name: "Dress-Up Dolls", href: "#" },
            { name: "Fairy Dolls", href: "#" },
            { name: "Custom Dolls", href: "#" },
          ],
        },
      ],
    },
    {
      id: "crochet-home-decor",
      name: "Home Decor",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc: "https://example.com/images/crochet-home-new.jpg",
          imageAlt: "Handmade crochet wall hangings and cushions.",
        },
        {
          name: "Cozy Collection",
          href: "#",
          imageSrc: "https://example.com/images/crochet-home-cozy.jpg",
          imageAlt: "A cozy crochet throw blanket on a sofa.",
        },
      ],
      sections: [
        {
          id: "decor",
          name: "Decor Items",
          items: [
            { name: "Wall Hangings", href: "#" },
            { name: "Cushion Covers", href: "#" },
            { name: "Blankets & Throws", href: "#" },
            { name: "Table Runners", href: "#" },
            { name: "Plant Hangers", href: "#" },
          ],
        },
        {
          id: "kitchen",
          name: "Kitchen & Dining",
          items: [
            { name: "Coasters", href: "#" },
            { name: "Pot Holders", href: "#" },
            { name: "Dishcloths", href: "#" },
            { name: "Mug Cozies", href: "#" },
          ],
        },
      ],
    },
    {
      id: "crochet-accessories",
      name: "Accessories",
      featured: [
        {
          name: "Handmade Wearables",
          href: "#",
          imageSrc: "https://example.com/images/crochet-wearables.jpg",
          imageAlt: "Crochet scarves, hats, and gloves neatly arranged.",
        },
        {
          name: "Seasonal Collection",
          href: "#",
          imageSrc: "https://example.com/images/crochet-seasonal.jpg",
          imageAlt: "Winter-themed crochet accessories.",
        },
      ],
      sections: [
        {
          id: "wearables",
          name: "Wearables",
          items: [
            { name: "Hats", href: "#" },
            { name: "Scarves", href: "#" },
            { name: "Gloves & Mittens", href: "#" },
            { name: "Shawls", href: "#" },
          ],
        },
        {
          id: "jewelry",
          name: "Jewelry",
          items: [
            { name: "Earrings", href: "#" },
            { name: "Bracelets", href: "#" },
            { name: "Necklaces", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About Us", href: "/aboutus" },
    { name: "Contact", href: "/contactus" },
    { name: "FAQs", href: "/faq" },
  ],
};
