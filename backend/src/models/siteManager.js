import mongoose from "mongoose";

const SiteManagerSchema = new mongoose.Schema({
  employeeName: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  customId: {
    type: String,
    unique: true
  },
});

const SiteManager = mongoose.model("SiteManager", SiteManagerSchema);

export default SiteManager;
