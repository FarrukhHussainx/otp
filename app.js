const express = require("express");
require("./db");
require("dotenv").config();

var cors = require("cors");

const userRouter = require("./router/user");
const orderRouter = require("./router/order");
const companyRouter = require("./router/comapny");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/company", companyRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on  ${PORT}`);
});
