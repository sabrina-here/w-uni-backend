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

async function run() {
  try {
    const countriesCollection = client.db("world_uni").collection("countries");
    const universitiesCollection = client
      .db("world_uni")
      .collection("universities");

    app.post("/addUniversities", async (req, res) => {
      const universities = req.body.array;
      const result = await universitiesCollection.insertMany(universities);
      res.send(result);
    });

    app.get("/countries", async (req, res) => {
      const query = {};
      const cursor = countriesCollection.find(query);
      const countries = await cursor.toArray();
      res.send(countries);
    });
  } finally {
  }
}
run().catch((e) => console.error(e));

app.listen(port, () => {
  console.log("running");
});
