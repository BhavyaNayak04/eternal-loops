import CustomOrder from "../models/CustomOrder.js";

// View all custom orders (return only name, image, and description)
export const getAllCustomOrders = async (_, res) => {
  try {
    const customOrders = await CustomOrder.find().select(
      "name image description"
    );
    res.status(200).json(customOrders);
  } catch (error) {
    console.error("Error fetching custom orders:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch custom orders", error: error.message });
  }
};

// View one custom order by orderId (return all details)
export const getCustomOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const customOrder = await CustomOrder.findOne({ _id: orderId });
    if (!customOrder) {
      return res.status(404).json({ message: "Custom order not found" });
    }
    res.status(200).json(customOrder);
  } catch (error) {
    console.error("Error fetching custom order:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch custom order", error: error.message });
  }
};

// Add a new custom order
export const addCustomOrder = async (req, res) => {
  const { userId, name, description, image, link, deadline } = req.body;

  try {
    const existingOrder = await CustomOrder.findOne({ userId });
    if (existingOrder && existingOrder.status === "pending") {
      return res
        .status(400)
        .json({ message: "You already have a pending order" });
    }

    const newCustomOrder = new CustomOrder({
      userId,
      name,
      description,
      image: image || null,
      link: link || null,
      deadline,
    });

    await newCustomOrder.save();
    res.status(201).json({
      message: "Custom order created successfully",
    });
  } catch (error) {
    console.error("Error creating custom order:", error);
    res
      .status(500)
      .json({ message: "Failed to create custom order", error: error.message });
  }
};

// Update the status of a custom order to "completed"
export const updateCustomOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await CustomOrder.findOneAndUpdate(
      { _id: orderId },
      { status: "completed" },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Custom order not found" });
    }

    res.status(200).json({
      message: "Custom order status updated to completed",
    });
  } catch (error) {
    console.error("Error updating custom order status:", error);
    res.status(500).json({
      message: "Failed to update custom order status",
      error: error.message,
    });
  }
};
