const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
});

const portfolio = mongoose.model("PORTFOLIO", portfolioSchema);

module.exports = portfolio;
