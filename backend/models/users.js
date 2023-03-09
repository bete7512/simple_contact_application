const mongoose = require('mongoose');
/**
 * Hey Betty this is for user schema means there is no sql and relational database here you do things here by yourself as I saif you in contact schema
 * and the same thing here as I said in contact schema
 * happy coding 
 */

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);