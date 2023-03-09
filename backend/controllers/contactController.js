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
//https://localhost:3000/api/contacts/ get request
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json({ success: true, message: 'Contacts retrieved successfully', data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getContactsById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    if (String(contact.user) !== String(req.user._id)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    res.status(200).json({ success: true, message: 'Contact retrieved successfully', data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.editContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    if (String(contact.user) !== String(req.user._id)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await contact.save();
    res.status(200).json({ success: true, message: 'Contact updated successfully', data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    if (String(contact.user) !== String(req.user._id)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    await contact.remove();
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


