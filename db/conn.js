const mongoose = require("mongoose");

const DB = process.env.GlobalURL;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected");
  })
  .catch(() => console.log("Not Connected"));