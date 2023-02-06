const express = require("express");
const router = express.Router();

const orders = require("../model/order");
// //get All customers
// router.get("/orders", async (req, res) => {
//   const notes = await orders.find({});
//   res.json(notes);
// });
// //to get all notes of loged in company
// router.get("/fetchallorders", fetchuser, async (req, res) => {
//   const notes = await orders.find({ customer_id: req.user });
//   res.json(notes);
// });

//Create new order
router.post("/createorder", async (req, res) => {
  const {
    customer_id,
    customername,
    customerAddress,
    company_id,
    price,
    Time,
    day,
    servicetype,
  } = req.body;
  const d = new Date();
  let date = d.getDate();
  let month = d.getMonth();
  month += 1;
  const note = new orders({
    customer_id,
    customername,
    customerAddress,
    company_id,
    price,
    Time,
    day,
    servicetype,
    date: date,
    month: month,
  });
  const savedNote = await note.save();
  res.json(savedNote);
});
// //update loged-in note of user
// router.put("/updateservice/:id", fetchuser, async (req, res) => {
//   const { name, iprice, dprice } = req.body;
//   let newNote = {};
//   if (name) {
//     newNote.name = name;
//   }
//   if (iprice) {
//     newNote.iprice = iprice;
//   }
//   if (dprice) {
//     newNote.dprice = dprice;
//   }
//   let note = await Services.findById(req.params.id);
//   if (!note) {
//     return res.status(401).send("not found");
//   }
//   // if (note.user.toString() !== req.user) {
//   //   return res.status(401).send("not allowed");
//   // }
//   note = await Services.findByIdAndUpdate(
//     req.params.id,
//     { $set: newNote },
//     { new: true }
//   );
//   res.json({ note });
// });
// //Delete loged-in note of user
// router.delete("/deleteOrder/:id", fetchuser, async (req, res) => {
//   // const { title, description, tag } = req.body;

//   // let note = await orders.findById(req.params.id);
//   // if (!note) {
//   //   return res.status(401).send("not found");
//   // }
//   // if (note.user.toString() !== req.user) {
//   //   return res.status(401).send("not allowed");
//   // }
//   const note = await orders.findByIdAndDelete(req.params.id);
//   res.json({ success: "Service deleted" });
// });

router.get("/getorders/:id", async (req, res) => {
  const notes = await orders.find({ customer_id: req.params.id });
  console.log(req.body);
  res.json(notes);
});
router.get("/getallorders", async (req, res) => {
  const notes = await orders.find();
  console.log(req.body);
  res.json(notes);
});
module.exports = router;
