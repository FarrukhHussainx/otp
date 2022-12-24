///////////////
const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://farrukhx:Farrukh123@cluster0.zotdnvr.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", true);
mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("Error:", e);
  });
