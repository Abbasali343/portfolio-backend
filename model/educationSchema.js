const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    type:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
      },
  });
  
  const education = mongoose.model("EDUCATION", educationSchema);

  module.exports = education;