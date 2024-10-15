const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    product: {
      type:  mongoose.Schema.Types.ObjectId, 
      ref: "Product",
    },

    user: {
      type:  mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },

    quantity: {
      type: Number,
      default: 1,
    },

  },
  { timestamps: true }
);

/* create cart schema */
const Cart = mongoose.model("Cart", cartSchema);

/* export cart schema */
module.exports = Cart;
