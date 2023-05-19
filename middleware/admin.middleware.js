const jwt = require('jsonwebtoken');
require("dotenv").config();

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      if (decoded.isAdmin) {
        next();
      } else {
        res.status(400).send({ msg: "Please Login as Admin" });
      }
    } catch (error) {
      res.status(400).send({ msg: "Please Login as Admin" });
    }
  } else {
    res.status(400).send({ msg: "Please Login as Admin" });
  }
};

module.exports = adminAuth;
