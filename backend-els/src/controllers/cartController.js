import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get the count of items in the cart
export const count = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemCount = cart.items.length;
    res.status(200).json({ itemCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart item count" });
  }
};

// Get all products in the cart
export const getCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price image description quantity"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart products" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0 },
      { new: true }
    );
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    const prod = await Product.findById(productId);

    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if the product already exists in the cart
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (newQuantity > prod.quantity) {
        return res.status(400).json({
          message: `Cannot add more than ${prod.quantity} items of this product.`,
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new product to the cart with maxQuantity
      if (quantity > prod.quantity) {
        return res.status(400).json({
          message: `Cannot add more than ${prod.quantity} items of this product.`,
        });
      }

      cart.items.push({ productId, quantity, maxQuantity: prod.quantity });
    }

    // Final validation to ensure no invalid items are added
    cart.items = cart.items.filter((item) => item.productId);

    // Update total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = item.productId; // Ensure productId is valid
      return total + item.quantity * (product?.price || 0);
    }, 0);

    await cart.save();

    // Populate the cart to include product details and maxQuantity
    const populatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price image description quantity"
    );

    res.status(200).json({
      message: "Item added to cart successfully",
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

export const updateQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0.",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate against maxQuantity (product stock)
    if (quantity > product.quantity) {
      return res.status(400).json({
        message: `Cannot add more than ${product.quantity} items of this product.`,
      });
    }

    // Update quantity in the cart
    if (cart.items[itemIndex].quantity === quantity) {
      return res.status(200).json({
        message: "Quantity is already up-to-date.",
        success: true,
        cart,
      });
    }

    cart.items[itemIndex].quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = item.productId; // Ensure productId is valid
      return total + item.quantity * (product?.price || 0);
    }, 0);

    await cart.save();
    res.status(200).json({
      message: "Cart updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = item.productId; // Ensure productId is valid
      return total + item.quantity * (product?.price || 0);
    }, 0);

    await cart.save();
    res.status(200).json({
      message: "Item removed from cart successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
