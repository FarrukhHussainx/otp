const express = require("express");
const router = express.Router();

const company = require("../model/company");
// //get All customers
router.get("/gatallcompanies", async (req, res) => {
  const notes = await company.find({});
  res.json(notes);
});

router.put("/updatecompanystatus/:id", async (req, res) => {
  const { isEnabled } = req.body;
  console.log(isEnabled);
  let newNote = {};
  if (isEnabled) {
    newNote.isEnabled = isEnabled;
  }

  let note = await company.findById(req.params.id);
  if (!note) {
    return res.status(401).send("not found");
  }
  // if (note.user.toString() !== req.user) {
  //   return res.status(401).send("not allowed");
  // }
  note = await company.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
module.exports = router;
