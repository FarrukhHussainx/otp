const { isValidObjectId } = require("mongoose");
const ResetToken = require("../model/resetToken");
const User = require("../model/user");
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  console.log(token);
  if (!token || !id) sendError(res, "Invalid request!");

  if (!isValidObjectId(id)) return sendError(res, "invalid user!");

  const user = await User.findById(id);
  if (!user) return sendError(res, "User not found!");

  const resetToken = await ResetToken.findOne({ owner: user._id });
  console.log(resetToken);
  if (!resetToken) return sendError(res, "Reset token is not found");

  const isValid = await resetToken.compareToken(token);

  if (!isValid) return sendError(res, "Reset token is not valid");

  req.user = user;
  next();
};
