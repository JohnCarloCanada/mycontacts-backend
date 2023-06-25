const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({
    user_id: req.user.id,
  });

  res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNum } = req.body;
  if (!name || !email || !phoneNum) {
    res.status(400);
    throw new Error("The Req Body is Empty");
  }
  const contacts = await Contact.create({
    name,
    email,
    phoneNum,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@desc Get contacts by ID
//@route POST /api/contacts/:id
//@access private
const getContactByID = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission");
  }

  const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updateContact);
});

//@desc Delete contacts
//@route POST /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission");
  }

  await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(contact);
});

module.exports = { getContact, createContact, getContactByID, updateContact, deleteContact };
