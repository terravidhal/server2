const Product = require("../models/product.model");



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


