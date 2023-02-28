const mongoose = require("mongoose");

const UserFormData = new mongoose.Schema({
  dept: { type: String, required: true },
  subDept: { type: String, required: true },
  userData: { type: String, required: true },
  form_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JSONForm",
    required: true,
  },
});

module.exports = mongoose.model("UserFormData", UserFormData);
