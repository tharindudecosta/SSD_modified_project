import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  siteName: {
    type: String,
  },

  siteAddress: {
    type: String,
  },

  siteContactNumber: {
    type: String,
  },

  materials: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      noOfItemsInStock: { type: Number },
    },
  ],
});

const Site = mongoose.model("Site", SiteSchema);

export default Site;
