import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
