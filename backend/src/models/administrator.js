import mongoose from "mongoose";

const AdministratorSchema = new mongoose.Schema({
  employeeName: {
    type: String,
  },

  contactNumber: {
    type: Number,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

const Administrator = mongoose.model("Administrator", AdministratorSchema);

export default Administrator;
