// app.js (Main file)
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authMiddleware = require('./middlewares/authController');
/**
 * this is the main file where you will run your server
 * and you will connect to database
 * Object Data modeling library is mongoose
 */
const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use(bodyParser.json());
//https://localhost:3000/api/users
app.use('/api/users', userRoutes);
/**
 * login and signup routes are public routes so we don't need to pass authMiddleware
 */
//https://localhost:3000/api/contacts/newcontact post request name email phone tag header token
app.use('/api/contacts', authMiddleware, contactRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});