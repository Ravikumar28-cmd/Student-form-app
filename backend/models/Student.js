const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  mobile: String,

  status: {
    type: String,
    default: "Pending",
  },

  // optional fields used in modal
  gender: String,
  dob: String,
  fatherName: String,
  motherName: String,
  category: String,
  address: String,
  photo: String,
});

module.exports = mongoose.model("Student", studentSchema);
