import mongoose from "mongoose";

const OrderRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },

  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  totalAmount: {
    type: Number,
  },

  siteManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteManager",
  },

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },

  isApproved: {
    type: Boolean,
  },

  isPlaced: {
    type: Boolean,
  },
});

const OrderRequest = mongoose.model("OrderRequest", OrderRequestSchema);

export default OrderRequest;
