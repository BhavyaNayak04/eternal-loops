import Like from "../models/Like.js";

export const hasLikedProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const like = await Like.findOne({ userId, productId });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to check like status", error: error.message });
  }
};

export const getLikedProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await Like.find({ userId }).populate(
      "productId",
      "name image price"
    );
    res.status(200).json(likes.map((like) => like.productId));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch liked products",
      error: error.message,
    });
  }
};

export const getProductLikeCount = async (req, res) => {
  const { productId } = req.params;

  try {
    const likeCount = await Like.countDocuments({ productId });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch like count", error: error.message });
  }
};

export const getTopLikedProducts = async (req, res) => {
  try {
    const topProducts = await Like.aggregate([
      { $group: { _id: "$productId", likeCount: { $sum: 1 } } },
      { $sort: { likeCount: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $project: { _id: 0, product: 1, likeCount: 1 } },
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch top liked products",
      error: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  const { userId, productId, action } = req.body;
  try {
    if (action === "like") {
      const existingLike = await Like.findOne({ userId, productId });
      if (existingLike) {
        return res.status(400).json({ message: "Product already liked" });
      }
      const newLike = new Like({ userId, productId });
      await newLike.save();
      res.status(201).json({ message: "Product liked successfully" });
    } else if (action === "unlike") {
      const existingLike = await Like.findOne({ userId, productId });
      if (!existingLike) {
        return res.status(400).json({ message: "Product not liked yet" });
      }
      await Like.deleteOne({ userId, productId });
      res.status(200).json({ message: "Product unliked successfully" });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to toggle like", error: error.message });
  }
};
