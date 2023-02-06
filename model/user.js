const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  verified: {
    type: String,
    default: false,
    required: true,
  },
  wallet: { type: Number, default: 0 },
  address: {
    type: String,
    required: true,
    default: " soan garden",
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};
module.exports = mongoose.model("User", userSchema);
