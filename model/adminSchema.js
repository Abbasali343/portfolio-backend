const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  projects: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  clients: {
    type: Number,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },

  profession: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  education: {
    type: Array,
  },
  experienceData: {
    type: Array,
  },
  pfLinks: {
    type: Array,
  },
  testimonials: {
    type: Array,
  },
  professionsData: {
    type: Array,
  },
});

const admin = mongoose.model("ADMIN", adminSchema);

module.exports = admin;
