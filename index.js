const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("world university server running here");
});

// iknowthissabrina
// x847ZYzoAfbFvyrg

const uri =
  "mongodb+srv://iknowthissabrina:x847ZYzoAfbFvyrg@cluster0.ioodpim.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(port, () => {
  console.log(running);
});
