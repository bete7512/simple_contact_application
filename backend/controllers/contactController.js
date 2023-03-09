// contactController.js (Controller)
const Contact = require('../models/Contact');

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

