import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

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
  const { contactNumber, address } = req.body;

  const updateFields = {};

  if (contactNumber) updateFields.contactNumber = contactNumber;
  if (address) updateFields.address = address;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { contactNumber, address },
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

export const logout = async (req, res) => {
  try {
    // Clear the refresh token from the database
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await RefreshToken.findOneAndDelete({ token: refreshToken });
    }
    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
