const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Store = require("../models/store.model");
const Brand = require("../models/brand.model");
const remove = require("../utils/remove.util");
const Review = require("../models/review.model");
const User = require("../models/user.model");



module.exports.createProduct = async (req, res) => {
  try {
    //const { title, image, orgId } = req.body;
    const { email } = req.userData;

    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {eeer
    res.status(400).json({ error: "failed to create" });
  }
};


