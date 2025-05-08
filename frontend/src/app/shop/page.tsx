"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/home/Footer";
import { Product } from "@/types/index";
import { getAllProducts } from "@/api/products/getAll";
import { categories, priceRanges } from "@/types/index";
import Products from "@/components/shop/Products";
import { useAuth } from "@/context/AuthContext";

export default function Shop() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      const products = await getAllProducts(user.userId);
      setProducts(products);
    };
    fetchProducts();
  }, [user]);

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
        product.tag.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort filtered products
  const sortedProducts: Product[] = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
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
          <div className="flex-1 basis-3/4">
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
            <Products sortedProducts={sortedProducts} user={user} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
