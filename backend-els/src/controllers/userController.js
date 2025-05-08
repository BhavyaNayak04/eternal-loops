import User from "../models/User.js";

// Fetch user details by userId
export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user details", error: error.message });
  }
};

// Edit user profile
export const editUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, contactNumber, address } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (contactNumber) updateFields.contactNumber = contactNumber;
  if (address) updateFields.address = address;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, contactNumber, address },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ message: "Failed to update user profile", error: error.message });
  }
};

