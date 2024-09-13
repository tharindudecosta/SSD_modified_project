import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
  },

  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  totalAmount: {
    type: Number,
  },

  siteManager: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SiteManager",
    },
  },

  supplier: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  },

  isDelivered: {
    type: Boolean,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
