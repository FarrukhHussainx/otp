const mongoose = require("mongoose");
const { Schema } = mongoose;
const ordersSchema = new Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  servicetype: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "place",
  },
  customername: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    default: "General",
  },
  Time: {
    type: String,
    required: true,
    default: "General",
  },
  customerAddress: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: "General",
  },
  month: {
    type: Number,
    default: "General",
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("orders", ordersSchema);
