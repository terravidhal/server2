const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ROLES } = require("../config/variables.config");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please, provide your email address"],
      validate: [validator.isEmail, "Provide a valid email address"],
      unique: [true, "Email already exist. Please, provide new"],
    },

    password: {
      type: String,
      required: [true, "Please, provide a strong password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number and symbol",
      },
      minLength: [8, "Password should be at least 8 characters"],
      maxLength: [20, "Password should be at most 20 characters"],
    },

    image: {
      type: String,
    },

    role: {
      type: String,
      enum: ROLES, 
      default: ROLES[0], 
    },

    phone: {
      type: String,
      required: [
        true,
        "Please, provide your phone number, i.e.: +8801xxxxxxxxx",
      ],
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
        message:
          "Phone number {VALUE} is not valid. Please, retry like +8801xxxxxxxxx",
      },
      unique: true,
    },

    // for cart
    cart: [  //(cartIds ou cart) (tableau d'id) one to many user et cart
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cart",
      },
    ],

    // for wishlist
    favorites: [  //one to many user et favorites
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Favorite",
      },
    ],

    // for reviews
    reviews: [    //one to many user et favorites
     {
       type: mongoose.Schema.Types.ObjectId, 
       ref: "Review",
     },
   ],

   // for store creation
   store: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Store",
  },

   // for category creation
   category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
  },

  // for buying products
  products: [ // many to many (buyers et products)
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
    },
  ],

  // for address
  address: {
    type: String,
    default: "N/A",
    trim: true,
    maxLength: [500, "Your address would be at most 500 characters"],
  },

  },
  {
    timestamps: true,
  }
);


UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword) 
  .set((value) => (this._confirmPassword = value)); 

UserSchema.pre("validate", function (next){ 
  if(this.confirmPassword !== this.password ){
    this.invalidate("confirmPassword", "Error: passwords didn't match. Please try again.");
  }

  next(); 
})

UserSchema.pre("save", function (next) {  
  bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
