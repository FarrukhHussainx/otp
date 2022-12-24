const User = require("../model/user");
const { sendError, createRandomBytes } = require("../utils/helper");

const jwt = require("jsonwebtoken");
const {
  generateOtp,
  mailTransport,
  generateEmailTemplate,
  plainEmailTemplate,
  generatePasswordResetTemplate,
} = require("../utils/mail");
const VerificationToken = require("../model/verificationToken");
const { isValidObjectId } = require("mongoose");
const verificationToken = require("../model/verificationToken");
const ResetToken = require("../model/resetToken");
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return sendError(res, "This email is already exists!");
  const newUser = new User({ name, email, password });

  const OTP = generateOtp();
  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await verificationToken.save();
  mailTransport().sendMail({
    from: "emailverification@email.com",
    to: newUser.email,
    subject: "JUSTCLICK, Verify your email account",
    html: generateEmailTemplate(OTP),
  });
  await newUser.save();
  res.send(newUser);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "email/password missing!");
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!");
  console.log(user);
  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "email/password does not match!");
  const secret = "emp123";
  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: "1d",
  });
  res.json({
    success: true,
    user: { name: user.name, email: user.email, id: user._id, token: token },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if ((!userId, !otp.trim()))
    return sendError(res, "Invalid request, missing parameters!");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user id!");
  const user = await User.findById(userId);
  if (!user) return sendError(res, "Sorry, user not found");
  const b = user.verified;
  console.log(user.verified);
  if (!false) return sendError(res, "This account is already verified!");

  const token = await verificationToken.findOne({ owner: user._id });

  if (!token) return sendError(res, "Sorry, user not found!");
  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "Please provide a valid token");
  user.verified = true;
  await verificationToken.findByIdAndDelete(token._id);
  await user.save();
  mailTransport().sendMail({
    from: "JustClick@email.com",
    to: user.email,
    subject: "JUSTCLICK, Verify your email account",
    html: plainEmailTemplate(
      "Email Verified SUccessfully",
      "Thanks for connecting with us"
    ),
  });
  res.json({
    success: true,
    message: "your email is varified",
    user: { name: user.name, email: user.email, id: user._id },
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "please provide a valid email!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found, invalid request!");

  const token = await ResetToken.findOne({ owner: user._id });
  if (token)
    return sendError(
      res,
      "Only after one hour you can request for another token!"
    );

  const randomBytes = await createRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();

  mailTransport().sendMail({
    from: "JustClickForget@email.com",
    to: user.email,
    subject: "Just Click,Password Reset",
    html: generatePasswordResetTemplate(
      `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
    ),
  });

  res.json({
    success: true,
    message: "Password reset link is sent to your email",
  });
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return sendError(res, "User not found!");

  const isSamePassword = await user.comparePassword(password);
  if (isSamePassword) return sendError(res, "New password must be different!");

  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(
      res,
      "New password must be different!Password must be 8 to 20 characters"
    );

  user.password = password.trim();
  await user.save();

  await ResetToken.findOneAndDelete({ owner: user._id });

  mailTransport().sendMail({
    from: "JustClickReset@email.com",
    to: user.email,
    subject: "Just Click,Password Reset Successfully",
    html: plainEmailTemplate(
      "Password Reset Successfully",
      "Now you can login with new password!"
    ),
  });

  res.json({
    success: true,
    message: "Password Reset Successfully",
  });
};
