const {
  login,
  logout,
  register
} = require("../controllers/user.controller");

const { authenticate } = require('../config/jwt.config');
const { checkPermissions } = require('../config/jwt.config');


module.exports = app => {
    app.post("/auth/register", register);
    app.post("/auth/login", login);
    app.post("/auth/logout", logout); 
}





