const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    ordered_by: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    payment: { type: Number, required: true },
    isCarted: { type: Boolean, required: true },
    isConfirmed: { type: Boolean, required: true },
    isDelivered: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
