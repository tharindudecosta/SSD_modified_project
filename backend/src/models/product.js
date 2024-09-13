import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
  },

  unitOfMeasure: {
    type: String,
  },

  qty: {
    type: Number,
  },

  unitPrice: {
    type: Number,
  },

  restrictedProduct: {
    type: Boolean,
  },

  hasQuoted: {
    type: Boolean,
    default: false,
  },

  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
