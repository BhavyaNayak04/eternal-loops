import Cart from "../models/Cart.js";

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
