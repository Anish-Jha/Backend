const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.key);
      req.body.userID = decoded.userID;
      req._id = decoded.userID;
      next();
    } else {
      throw new Error('Authorization token not found');
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: 'Unauthorized access' });
  }
};

module.exports = auth;
