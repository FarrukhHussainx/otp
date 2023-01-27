// ///////////////
const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://farukh:farukh123@fyp.xvknyqx.mongodb.net/TheHandys?retryWrites=true&w=majority";
// const dbUrl =
//   "mongodb+srv://farrukhx:farrukh123@cluster0.zotdnvr.mongodb.net/?retryWrites=true&w=majority";
// const dbUrl = "mongodb://localhost:27017";

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

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://farukh:farukh123@fyp.xvknyqx.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("TheHandys").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
