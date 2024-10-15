// seeders/admin-seeder.js
require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");


async function seedAdmin() {
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
  
    // Check if admin already exists
    try {
      const existingAdmin = await UserModel.findOne({ role: 'admin' });
  
      if (!existingAdmin) {
        // Create admin credentials
        const adminCredentials = {
          name: process.env.NAME_ADMIN,
          email: process.env.EMAIL_ADMIN,
          password: process.env.PASSWORD_ADMIN,
          confirmPassword: process.env.PASSWORD_ADMIN,
          role: process.env.ROLE_ADMIN,
          phone: process.env.PHONE_ADMIN,
        };
  
        // Hash the admin password
       // const salt = await bcrypt.genSalt(10);
       // const hashedPassword = await bcrypt.hash(adminCredentials.password, 10);
       // adminCredentials.password = hashedPassword;
  
        // Create admin user
        await UserModel.create(adminCredentials);
        console.log("Admin user created successfully");
      } else {
        console.log("Admin user already exists");
      }
    } catch (err) {
      console.error("Error creating admin user:", err);
      process.exit(1); // Exit process with failure code
    }
  
    // Close the database connection
    await mongoose.disconnect();
  }

// Execute the admin seeder
seedAdmin().then(() => {
  console.log("Admin seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});