const mongoose = require("mongoose");

const zipSchema = mongoose.Schema({
  zip: {
    type: String,
  },
});

const Zip = mongoose.model("Zip", zipSchema);
module.exports = Zip;
