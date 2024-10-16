const Product = require("../models/product.model");





module.exports.createProduct = (req, res) => {

  const { _id } = req.userData;

  const data = {
      title : req.body.title, 
      summary : req.body.summary,
      price : req.body.price,
      address : req.body.address,
      certified : req.body.certified,
      category : req.body.category,
      image : req.body.image,
      seller: _id
  }
  Product.create(data)
      .then(newlyCreatedOrg => {
          res.json(newlyCreatedOrg)
      })
      .catch((err) => {
          res.status(400).json(err) 
      });
}


module.exports.createProduct2 = async (req, res) => {
  try {
    //const { title, image, orgId } = req.body;
    const { email } = req.userData;

    console.log("55555",req.body)
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "failed to create" });
  }
};

// find many
module.exports.getProductsBy = async (req, res) => {
  const { _id } = req.userData;
  try {
    const organization = await Product.find({ seller: _id })
       res.json(organization);
  } catch (err) {
    res.status(400).json(err);
  }
}; 


