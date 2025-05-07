import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const count = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    const itemCount = cart
      ? cart.items.reduce((count, item) => count + item.quantity, 0)
      : 0;
    res.status(200).json({ itemCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart item count" });
  }
};

export const getCartProducts = async (req, res) => {
  const userId = req.user._id; //change

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price image"
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

export const clearCart = async (req, res) => {
  const userId = req.user._id; //change

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
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.totalPrice += quantity * (await Product.findById(productId)).price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};
