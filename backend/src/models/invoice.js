import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  description: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  dueDate: {
    type: Date,
  },

  totalAmount: {
    type: Number,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
