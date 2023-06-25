const express = require("express");
const router = express.Router();
const { getContact, createContact, getContactByID, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// Short Hand Way or Multiple HTTP methods on one route
/* router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactByID).put(updateContact).delete(deleteContact); */

router.use(validateToken);

router.route("/").get(getContact);
router.route("/").post(createContact);
router.route("/:id").get(getContactByID);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;
