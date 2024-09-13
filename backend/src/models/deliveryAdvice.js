import mongoose from "mongoose";

const DeliveryAdviceSchema = new mongoose.Schema({
  deliveredDate: {
    type: Date,
    default: Date.now(),
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderRequest",
  },

  isApproved: {
    type: Boolean,
  },
});

const DeliveryAdvice = mongoose.model("DeliveryAdvice", DeliveryAdviceSchema);

export default DeliveryAdvice;
