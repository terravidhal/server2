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


/* filtered products */
exports.getFilteredProducts = async (req, res) => {
  try {
    let filter = {};

    if (req.query.category != "null") {
      filter.category = req.query.category;
    }

    if (req.query.brand != "null") {
      filter.brand = req.query.brand;
    }

    if (req.query.store != "null") {
      filter.store = req.query.store;
    }

    const products = await Product.find(filter).populate([
      "category",
      "brand",
      "store",
    ]);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "Filtered products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Failed to fetch filtered products",
      error: error.message,
    });
  }
};

/* update product */
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const updatedProduct = req.body;

  if (!req.body.thumbnail && req.files && req.files.thumbnail?.length > 0) {
    remove(product.thumbnail.public_id);

    updatedProduct.thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  }

  if (
    !req.body.gallery?.length > 0 &&
    req.files &&
    req.files.gallery?.length > 0
  ) {
    for (let i = 0; i < product.gallery.length; i++) {
      await remove(product.gallery[i].public_id);
    }

    updatedProduct.gallery = req.files.gallery.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  updatedProduct.features = JSON.parse(req.body.features);
  updatedProduct.campaign = JSON.parse(req.body.campaign);
  updatedProduct.variations = JSON.parse(req.body.variations);

  await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product updated successfully",
  });
};

/* delete product */
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  // delete product thumbnail & gallery
  if (product.thumbnail) {
    await remove(product.thumbnail.public_id);
  }

  if (product.gallery && product.gallery.length > 0) {
    for (let i = 0; i < product.gallery.length; i++) {
      await remove(product.gallery[i].public_id);
    }
  }

  // also delete from category, brand & store
  await Category.findByIdAndUpdate(product.category, {
    $pull: { products: product._id },
  });
  await Brand.findByIdAndUpdate(product.brand, {
    $pull: { products: product._id },
  });
  await Store.findByIdAndUpdate(product.store, {
    $pull: { products: product._id },
  });

  
  await User.updateMany(
    { products: product._id },
    { $pull: { products: product._id } }
  );


  await Review.deleteMany({ product: product._id });
  await User.updateMany(
    { reviews: { $in: product.reviews } },
    { $pull: { reviews: { $in: product.reviews } } }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product deleted successfully",
  });
};


