const mongoose = require("mongoose");
const validator = require("validator");


const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a category name"],
      trim: true,
      unique: [true, "Same category already exists"],
      maxLength: [100, "Your title would be at most 100 characters"],
    },

    description: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // for products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
      },
    ],

    // for creator
    creator: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


/* create category model schema */
const Category = mongoose.model("Category", categorySchema);

/* export category schema */
module.exports = Category;
