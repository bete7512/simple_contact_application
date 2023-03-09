const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * 
 * @param {*} req this is for request comes from frontend it is a object and it has many properties for example req.body, req.params, req.query, req.headers etc you can use names to request instaed of req
 * @param {*} res this is for server response to frontend it is a object and it has many properties for example res.status, res.json, res.send etc you can use names to response instaed of res // Think some body asks you something and you answer him/her
 * @param {*} next this is for next middleware or next function to run means if you have a middleware and you want to run another middleware or function after this middleware you can use next() to run next middleware or function
 * @returns this is for return a response to frontend this is for function not for frontend
 * happy coding 
 */

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: false, message: 'Authorization header not found' });
  }
  try {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, 'process.env.JWT_SECRET');
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};