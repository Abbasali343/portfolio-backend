const mongoose = require("mongoose");

const professionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String
    },
  });
  
  const profession = mongoose.model("PROFESSION", professionSchema);

  module.exports = profession;