const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded.userID) {
        req.body.userID = decoded.userID;
        req._id = decoded.userID;
        next();
      } else {
        throw new Error('Invalid token');
      }
    } else {
      throw new Error('Authorization token not found');
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: 'Unauthorized access' });
  }
};

module.exports = auth;
