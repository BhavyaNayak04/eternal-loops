import Like from "../models/Like.js";

export const hasLikedProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const like = await Like.findOne({ userId, productId });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check like status", error: error.message });
  }
};

export const getLikedProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await Like.find({ userId }).populate("productId", "name image price");
    res.status(200).json(likes.map((like) => like.productId));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch liked products", error: error.message });
  }
};

export const getProductLikeCount = async (req, res) => {
  const { productId } = req.params;

  try {
    const likeCount = await Like.countDocuments({ productId });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch like count", error: error.message });
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
    res.status(500).json({ message: "Failed to fetch top liked products", error: error.message });
  }
};