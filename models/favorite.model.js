const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    // for user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // for product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    
  },
  { timestamps: true }
);

/* create favorite model */
const Favorite = mongoose.model("Favorite", favoriteSchema);

/* export favorite model */
module.exports = Favorite;
