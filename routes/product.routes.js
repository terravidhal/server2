const { createProduct,
 } 
= require('../controllers/product.controller');

const { authenticate } = require('../config/jwt.config');
const { checkPermissions } = require('../config/jwt.config');


module.exports = app => {
app.post('/product/create', authenticate, createProduct);  
}





