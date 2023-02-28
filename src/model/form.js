const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  dept: { type: String, required: true },
  subDept: { type: String, required: true },
  jsonForm: { type: String, required: true },
});


module.exports = mongoose.model('JSONForm', formSchema)