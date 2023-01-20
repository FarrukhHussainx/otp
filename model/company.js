const mongoose = require("mongoose");
const { Schema } = mongoose;
const companySchema = new Schema({});

module.exports = mongoose.model("companies", companySchema);
