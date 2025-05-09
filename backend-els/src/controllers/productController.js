import Like from "../models/Like.js";
import Product from "../models/Product.js";

// Add a new product
export const addProduct = async (req, res) => {
  const { name, description, price, image, tag } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      tag,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully!", product: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  const { userId } = req.params;
  try {
    const products = await Product.find();
    const likedProducts = await Like.find({ userId }).select("productId");
    const likedProductIds = new Set(
      likedProducts.map((like) => like.productId.toString())
    );
    const productsWithIsLiked = products.map((product) => ({
      ...product.toObject(),
      isLiked: likedProductIds.has(product._id.toString()),
    }));
    res.status(200).json(productsWithIsLiked);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { productId, userId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isLiked = await Like.exists({ userId, productId });

    const productWithIsLiked = {
      ...product.toObject(),
      isLiked: !!isLiked,
    };

    res.status(200).json(productWithIsLiked);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, tags } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, tags },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

export const getProductStock = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const stock = product.quantity;
    res.status(200).json({ stock });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

export const getAllProdutsForAdmin = async (req, res) => {
  const role  = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
