const User = require('../models/User');
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }
    const token = user.generateToken();
    res.status(200).json({ success: true, message: 'User logged in successfully', data: { user, token } });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};