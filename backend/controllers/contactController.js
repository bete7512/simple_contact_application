const Contact = require('../models/Contact');
/**
 * 
 * @param {*} req I mentioned this in authController.js
 * @param {*} res the same thing for res
 * here below are function to create contact, get contacts , edit contact and delete contact 
 * I will explain you how to use them in frontend
 * happy coding
 */
exports.createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const contact = await Contact.create({ name, email, phone, user: req.user._id });
    res.status(201).json({ success: true, message: 'Contact created successfully', data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json({ success: true, message: 'Contacts retrieved successfully', data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

