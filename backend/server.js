// app.js (Main file)
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
/**
 * this is the main file where you will run your server
 * and you will connect to database
 */
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});