const router = require("express").Router();
const { check } = require("express-validator");
const {
  createUser,
  signin,
  verifyEmail,
  forgetPassword,
  resetPassword,
  getalluser,
  getuser,
  updateuserstatus,
  updateuserinfo,
  updateuserwallet,
} = require("../controllers/user");
const { isResetTokenValid } = require("../middleware/user");
const { validateUser, validate } = require("../middleware/validator");

router.post("/create", validateUser, validate, createUser);
router.post("/signin", signin);
router.post("/verify-email", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.get("/verify-token", isResetTokenValid, (req, res) => {
  res.json({ success: true });
});
//get All customers
router.get("/getallcustomers", getalluser);
router.get("/getcustomers/:id", getuser);
router.put("/updateuserstatus/:id", updateuserstatus);
router.put("/updateuserwallet/:id", updateuserwallet);
router.put("/updateuserinfo/:id", updateuserinfo);
module.exports = router;
