const mongoose = require('mongoose');
/**
 * Hey Betty this is for contact scehma means there is no sql and relational database here you do things here by yourself 
 * google for more information
 * mongoose is a library that helps you to connect to mongodb and it is a object data modeling library
 * but you can use mongodb without mongoose using mongodbclient instead of mongoose but it is not recommended
 * so happy coding Betty you will be somewhere in future try to challenge yourself and you will be there
 * I love you **ety wushetien atmesasechi eshi
 */
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  tag: { type: String, enum: ['family', 'friend', 'work', 'other'], default: 'other' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
