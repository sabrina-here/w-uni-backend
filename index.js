const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// const countries = require("./countries.json");

app.get("/", (req, res) => {
  res.send("world university server running here");
});
// app.get("/countries", (req, res) => {
//   res.send(countries);
// });

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
    const modifiedUniversitiesCollection = client
      .db("world_uni")
      .collection("modifiedUnis");
    const universitiesCollection = client
      .db("world_uni")
      .collection("universities");

    app.post("/addUniversities", async (req, res) => {
      const universities = req.body.array;
      const result = await universitiesCollection.insertMany(universities);
      res.send(result);
    });

    app.post("/addCountries", async (req, res) => {
      const allCountries = req.body.array;
      const result = await countriesCollection.insertMany(universities);
      res.send(result);
    });
    app.put("/updateUni/:country", async (req, res) => {
      console.log("api hit");
      const country = req.params.country;
      const filter = { country: country };
      const countryInfo = req.body;
      const option = { upsert: "true" };
      const updatedUnis = {
        $set: {
          flags: countryInfo.flags,
          currencies: countryInfo.currencies,
          capital: countryInfo.capital,
          region: countryInfo.region,
          languages: countryInfo.languages,
          maps: countryInfo.languages,
          population: countryInfo.population,
          timezones: countryInfo.timezones,
          continents: countryInfo.continents,
        },
      };
      const result = await universitiesCollection.updateMany(
        filter,
        updatedUnis,
        option
      );
      res.send(result);
    });

    app.get("/countries", async (req, res) => {
      const query = {};
      const cursor = countriesCollection.find(query);
      const countries = await cursor.toArray();
      res.send(countries);
    });
    app.get("/countries/:name", async (req, res) => {
      const name = req.params.name;
      const query = { "name.common": name };
      const country = await countriesCollection.findOne(query);
      // console.log(country);
      res.send(country);
    });
    app.get("/allUniversities", async (req, res) => {
      const cursor = universitiesCollection.find({});
      const allUniversities = await cursor.toArray();
      res.send(allUniversities);
    });
    app.get("/universities/countryName=:country", async (req, res) => {
      const country = req.params.country;
      const query = { country: country };
      const universities = await universitiesCollection.find(query);
      res.send(await universities.toArray());
    });
    app.get("/numOfUniversities/:country", async (req, res) => {
      const country = req.params.country;
      const query = { country: country };
      const cursor = await universitiesCollection.find(query);
      const universities = await cursor.toArray();
      res.send((await universities).length.toString());
    });
  } finally {
  }
}
run().catch((e) => console.error(e));

app.listen(port, () => {
  console.log("running");
});
