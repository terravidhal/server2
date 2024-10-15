require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");


async function seedProductOwner() {
    // Connect to the database
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Established a connection to the database');
    } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1); // Exit process with failure code
    }
  
    // Check if productOwner already exists
    try {
      const existingAProductOwner = await UserModel.findOne({ role: 'productOwner' });
  
      if (!existingAProductOwner) {
        // Create productOwner credentials
        const productOwnerCredentials = {
          name: process.env.NAME_PRODUCT_OWNER,
          email: process.env.EMAIL_PRODUCT_OWNER,
          password: process.env.PASSWORD_PRODUCT_OWNER,
          confirmPassword: process.env.PASSWORD_PRODUCT_OWNER,
          role: process.env.ROLE_PRODUCT_OWNER,
        };

        // Create productOwner user
        await UserModel.create(productOwnerCredentials);
        console.log("productOwner user created successfully");
      } else {
        console.log("productOwner user already exists");
      }
    } catch (err) {
      console.error("Error creating productOwner user:", err);
      process.exit(1); // Exit process with failure code
    }
  
    // Close the database connection
    await mongoose.disconnect();
  }

// Execute the productOwner seeder
seedProductOwner().then(() => {
  console.log("productOwner seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding productOwner:", err);
  process.exit(1);
});