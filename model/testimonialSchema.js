const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  profession: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
});

const testimonial = mongoose.model("TESTIMONIAL", testimonialSchema);

module.exports = testimonial;
