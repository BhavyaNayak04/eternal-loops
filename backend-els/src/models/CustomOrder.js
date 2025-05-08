import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
export default CustomOrder;
