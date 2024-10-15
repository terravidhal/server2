const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    rating: {
      type: Number,
      required: [true, "Please, provide a rating"],
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: [true, "Please, provide a comment"],
      maxLength: [200, "Your comment should be at most 200 characters"],
    },

  },
  { timestamps: true }
);

/* create review model */
const Review = mongoose.model("Review", reviewSchema);

/* export Review model */
module.exports = Review;
