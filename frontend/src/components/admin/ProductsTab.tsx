"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllForAdmin } from "@/api/products/getAllForAdmin";
import { Product } from "@/utils/types";
import { update } from "@/api/products/update";
import { add } from "@/api/products/add";

const initialFormState = {
  name: "",
  description: "",
  price: 0,
  image: "https://picsum.photos/1000/1000",
  tag: "mat",
};

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  const tags = ["mat", "toy", "decor", "wearable"];

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllForAdmin();
      setProducts(products);
    };
    fetchProducts();
    setIsLoading(false);
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Convert price to number if it's a number input
    if (name === "price") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditingProduct && editingProductId) {
      const updatedProducts = products.map((product) =>
        product._id === editingProductId
          ? {
              ...product,
              ...formData,
              inStock: true,
              quantity: 1,
            }
          : product
      );
      setProducts(updatedProducts);

      const response = await update(editingProductId, formData);
      if (!response.success) {
        alert("Error updating product");
        return;
      }
      setIsEditingProduct(false);
      setEditingProductId(null);
    } else {
      const response = await add(formData);
      setProducts([...products, response.product]);
    }

    setFormData(initialFormState);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      tag: product.tag,
    });
    setEditingProductId(product._id);
    setIsEditingProduct(true);
    setIsAddingProduct(true);
  };

  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product._id !== productId));
    }
  };

  // Cancel form
  const handleCancelForm = () => {
    setFormData(initialFormState);
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setEditingProductId(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Products Management
        </h2>
        {!isAddingProduct && (
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-medium"
          >
            Add New Product
          </button>
        )}
      </div>

      {/* Add/Edit Product Form */}
      {isAddingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {isEditingProduct ? "Edit Product" : "Add New Product"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag
                  </label>
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full h-40 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </p>
                  <div className="h-52 w-52 bg-gray-100 rounded relative">
                    {formData.image && (
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancelForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-medium"
              >
                {isEditingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Tag
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3">
                    <div className="h-16 w-16 rounded bg-gray-100 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description.length > 50
                          ? `${product.description.substring(0, 50)}...`
                          : product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800">${product.price}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
                      {product.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.inStock ? (
                      <span className="text-green-600 font-medium">
                        In Stock ({product.quantity})
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
