const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
  });
  
  const contact = mongoose.model("CONTACT", contactSchema);

  module.exports = contact;