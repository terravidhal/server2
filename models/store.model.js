const mongoose = require("mongoose");
const validator = require("validator");


const storeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a valid store name"],
      trim: true,
      unique: [true, "Same store already exists"],
      maxLength: [100, "Your title would be at most 100 characters"],
    },

    description: {
      type: String,
    },

    // for owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // for products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

/* create store schema model */
const Store = mongoose.model("Store", storeSchema);

/* export store schema */
module.exports = Store;
