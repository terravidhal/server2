const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

module.exports = {
  register: async (req, res) => { // user connect automaticly after registration
    try {
      // Create the newUser using await
      const newUser = await UserModel.create(req.body);

      // Generate the JWT token
        const userInfo = {
        id: newUser._id,
      };
      const userToken = jwt.sign(userInfo, process.env.JWT_SECRET);
  
      // Set the cookie and send the response
      const cookieOptions = {
        httpOnly: true, 
        expires: new Date(Date.now() + 14400000), // 4 heures
      };

      res
        .cookie("usertoken", userToken, cookieOptions)
        .json({ msg: "success!", user: newUser });

      res.json({ msg: "success!", user: newUser });
    } catch (err) {
      res.json(err);
    }
  },

  login: async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(400).json({ message: "user is not exist" });
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.status(400).json({ message: "incorrect Password!!!" });
    }

    // if we made it this far, the password was correct
    const userInfo = {
      _id: user._id,
    };

    const userToken = jwt.sign(userInfo, process.env.JWT_SECRET);

    // note that the response object allows chained calls to cookie and json
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 14400000), // 4 heures
    };

    res
      .cookie("usertoken", userToken, cookieOptions)
      .json({ msg: "success!", user: user });
  },

  logout: (req, res) => {
    // clear the cookie from the response
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },

};
