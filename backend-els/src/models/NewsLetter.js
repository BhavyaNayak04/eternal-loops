import mongoose from "mongoose";

const newsLetterScheme = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const NewsLetter = mongoose.model("NewsLetter", newsLetterScheme);

export default NewsLetter;
