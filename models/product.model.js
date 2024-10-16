const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
   /*   required: [true, "Please, provide a product title"],
      trim: true,
      unique: [true, "Same product already exists"],
      maxLength: [100, "Your title would be at most 100 characters"],*/
    },

    summary: {
      type: String,
     /* required: [true, "Please, provide product summary"],
      trim: true,
      maxLength: [500, "Your summary would be at most 500 characters"],*/
    },

    image: {
      type: String,
     /* required: [true, "Please, provide product summary"],
      trim: true,
      maxLength: [500, "Your summary would be at most 500 characters"],*/
    },

    certified: {
      type: String,
    },

    // for price
    price: {
      type: Number,
      //required: [true, "Please, provide a product price"],
    },

  // for address
  address: {
    type: String,
  /*  default: "N/A",
    trim: true,
    maxLength: [500, "Your address would be at most 500 characters"],*/
  },

  category: {
    type: String,
  },

    // for category
  /*  category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
    },*/


    // for user "seller"
    seller: { // many to one
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    }, 

    // for store
    store: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Store",
    },

    // for buyers
    buyers: [ //  many to many (products et buyers)
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
      },
    ],

    // for reviews
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

  },
  { timestamps: true }
);

/* create product schema */
const ProductModel = mongoose.model("Product", ProductSchema);

/* export product schema */
module.exports = ProductModel;



