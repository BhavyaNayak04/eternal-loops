'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home/Footer";

// Sample product data - you would replace this with actual data from your backend/CMS
const products = [
  {
    id: 1,
    name: "Bunny Amigurumi",
    price: 29.99,
    description:
      "Adorable hand-crocheted bunny plush with floppy ears. Perfect for babies and children of all ages.",
    image: "/products/bunny.webp",
    category: "animal",
    featured: true,
    inStock: true,
    tags: ["gifts", "toys", "baby"],
  },
  {
    id: 2,
    name: "Flower Coasters (Set of 4)",
    price: 19.99,
    description:
      "Beautiful flower-shaped coasters in pastel colors. Made with cotton yarn for durability.",
    image: "/products/coasters.webp",
    category: "accessory",
    featured: false,
    inStock: true,
    tags: ["home", "kitchen", "gift set"],
  },
  {
    id: 3,
    name: "Bear Keychain",
    price: 12.99,
    description:
      "Cute mini bear keychain made with soft acrylic yarn. A charming addition to your keys or bag.",
    image: "/products/bear-keychain.webp",
    category: "keychain",
    featured: false,
    inStock: true,
    tags: ["gifts", "accessories", "small"],
  },
  {
    id: 4,
    name: "Round Mandala Rug",
    price: 85.99,
    description:
      "Intricate hand-crocheted mandala rug in vibrant colors. Great for meditation spaces or as a decorative piece.",
    image: "/products/mandala-mat.webp",
    category: "mat",
    featured: true,
    inStock: true,
    tags: ["home", "decor", "boho"],
  },
  {
    id: 5,
    name: "Cat Amigurumi",
    price: 34.99,
    description:
      "Soft and cuddly cat plush with customizable colors. Each one is uniquely made with love.",
    image: "/products/cat.webp",
    category: "animal",
    featured: false,
    inStock: true,
    tags: ["gifts", "toys", "custom"],
  },
  {
    id: 6,
    name: "Cactus Plant Holder",
    price: 22.99,
    description:
      "Quirky cactus-shaped plant holder that adds a pop of color to your indoor garden.",
    image: "/products/plant-holder.webp",
    category: "accessory",
    featured: false,
    inStock: false,
    tags: ["home", "plants", "decor"],
  },
  {
    id: 7,
    name: "Elephant Keychain",
    price: 14.99,
    description:
      "Adorable elephant keychain with detailed stitching. Makes a perfect small gift.",
    image: "/products/elephant-keychain.webp",
    category: "keychain",
    featured: false,
    inStock: true,
    tags: ["gifts", "accessories", "small"],
  },
  {
    id: 8,
    name: "Rectangular Bath Mat",
    price: 49.99,
    description:
      "Plush and absorbent bath mat with non-slip backing. Machine washable and durable.",
    image: "/products/bath-mat.webp",
    category: "mat",
    featured: false,
    inStock: true,
    tags: ["home", "bathroom", "practical"],
  },
  {
    id: 9,
    name: "Fox Amigurumi",
    price: 32.99,
    description:
      "Charming fox plush with a bushy tail. Perfect for woodland-themed nurseries.",
    image: "/products/fox.webp",
    category: "animal",
    featured: true,
    inStock: true,
    tags: ["gifts", "toys", "nursery"],
  },
  {
    id: 10,
    name: "Plant Hanger",
    price: 28.99,
    description:
      "Macramé-inspired plant hanger for small to medium pots. Adds a bohemian touch to any space.",
    image: "/products/plant-hanger.webp",
    category: "accessory",
    featured: false,
    inStock: true,
    tags: ["home", "plants", "decor"],
  },
  {
    id: 11,
    name: "Sloth Keychain",
    price: 15.99,
    description:
      "Cute hanging sloth keychain made with eco-friendly yarn. Slow-living inspiration for your keys.",
    image: "/products/sloth-keychain.webp",
    category: "keychain",
    featured: false,
    inStock: true,
    tags: ["gifts", "accessories", "small"],
  },
  {
    id: 12,
    name: "Hexagon Coaster Set",
    price: 24.99,
    description:
      "Set of 6 hexagon-shaped coasters in rainbow colors. Modern design meets practicality.",
    image: "/products/hex-coasters.webp",
    category: "accessory",
    featured: false,
    inStock: true,
    tags: ["home", "kitchen", "gift set"],
  },
];

// Filter categories
const categories = [
  { id: "animal", name: "Animals" },
  { id: "accessory", name: "Accessories" },
  { id: "keychain", name: "Keychains" },
  { id: "mat", name: "Mats & Rugs" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "under20", name: "Under $20", min: 0, max: 20 },
  { id: "20to50", name: "$20 to $50", min: 20, max: 50 },
  { id: "over50", name: "Over $50", min: 50, max: 1000 },
];

export default function Shop() {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured"); // Default sort by featured
  const [searchQuery, setSearchQuery] = useState("");

  // Handle category filter changes
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle price range filter changes
  const handlePriceRangeChange = (rangeId) => {
    setSelectedPriceRange(rangeId === selectedPriceRange ? null : rangeId);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      if (product.price < range.min || product.price > range.max) {
        return false;
      }
    }

    // In stock filter
    if (inStockOnly && !product.inStock) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.featured - a.featured;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 mt-16">
      {/* Header/Navigation would be here */}

      {/* Page Header */}
      <div className="bg-rose-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-rose-800">
              Shop Our Collection
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover handcrafted crochet items made with love
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-rose-600 hover:text-rose-800"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name={`category-${category.id}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Price
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price-range"
                        type="radio"
                        checked={selectedPriceRange === range.id}
                        onChange={() => handlePriceRangeChange(range.id)}
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                      />
                      <label
                        htmlFor={`price-${range.id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="in-stock"
                    name="in-stock"
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="in-stock"
                    className="ml-2 text-sm text-gray-700"
                  >
                    In stock only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {sortedProducts.length} results
              </p>
              <div className="mt-3 sm:mt-0">
                <label htmlFor="sort" className="sr-only">
                  Sort by
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 py-1 px-2"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-105"
                      />
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs">
                          Out of Stock
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-rose-600 text-white px-2 py-1 rounded-md text-xs">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <span className="text-rose-600 font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category.charAt(0).toUpperCase() +
                          product.category.slice(1)}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                        {product.description}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className={`flex-1 py-2 rounded-md transition-colors text-sm font-medium
                            ${
                              product.inStock
                                ? "bg-rose-600 hover:bg-rose-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? "Add to Cart" : "Sold Out"}
                        </button>
                        <Link
                          href={`/product/${product.id}`}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter - Simplified version for Shop page */}
      <Footer/>

      {/* Footer would be here */}
    </div>
  );
}
