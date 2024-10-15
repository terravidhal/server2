const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      async(err, decodedToken) => {
        if (err) {
          res.status(401).json({ verified: false, message: "Unauthorized access." });
        } else {
          const user = await UserModel.findOne({ _id: decodedToken._id });
          if (user) {
            console.log("You are authenticated!");
          //  req.role = user.role;
            req.userData = user;
            next();
          } else {
            res.status(401).json({ verified: false , message: "Unauthorized access"});
          }
        }
      }
    );
  },

  checkPermissions: (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.userData.role)) {
        const error = res
          .status(401)
          .json({
            verified: false,
            message: "you do not have permission to perform this action",
          });
        next(error);
      } else {
        next();
      }
    };
  },
};
