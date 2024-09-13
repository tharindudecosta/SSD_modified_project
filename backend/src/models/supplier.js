import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
  },

  address: {
    type: String,
  },

  contactPerson: {
    type: String,
  },

  email: {
    type: String,
  },

  fax: {
    type: String,
  },

  password: {
    type: String,
  },

  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Supplier = mongoose.model("Supplier", SupplierSchema);

export default Supplier;
