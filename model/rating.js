const mongoose = require("mongoose");
const { Schema } = mongoose;
const ratingsSchema = new Schema({
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
  q1: {
    type: String,
    required: true,
  },
  q2: {
    type: String,
    required: true,
  },
  q3: {
    type: String,
    required: true,
  },
  q4: {
    type: String,
    required: true,
  },
  q5: {
    type: String,
    required: true,
  },
  averageRating: { type: String, required: true },
});

module.exports = mongoose.model("ratings", ratingsSchema);
