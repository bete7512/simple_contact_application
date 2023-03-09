const User = require('../models/User');
const jwt = require('jsonwebtoken');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//https://localhost:3000/api/users/login post request email and password response token
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({error:'Invalid email or password'});
    }
    const token = jwt.sign(user)
    res.status(200).json({ success: true, message: 'User logged in successfully', data: { user, token } });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};