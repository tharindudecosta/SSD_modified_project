import mongoose from "mongoose";

const ContructionSiteSchema = new mongoose.Schema({
  siteName: {
    type: String,
  },
  siteAddress: {
    type: String,
  },
  siteBudjet: {
    type: String,
  },
  siteManager: {
    type: String,
  },
  customId: {
    type: String,
    unique: true,
    default:null
  },
});

const ContructionSite = mongoose.model("ContructionSite", ContructionSiteSchema);

export default ContructionSite;
