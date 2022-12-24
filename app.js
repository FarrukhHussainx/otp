const express = require("express");
require("./db");
require("dotenv").config();

var cors = require("cors");

const userRouter = require("./router/user");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app is running on  ${PORT}`);
});
