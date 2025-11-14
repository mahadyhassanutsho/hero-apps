import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(async (req, _res, next) => {
  console.log(
    `[⌛ ${new Date().toLocaleString()} (from ${req.host})]
     ⚡ ${req.method} at ${req.path}`
  );
  next();
});

// Configs
dotenv.config();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server] listening on port ${port}`);
      console.log(`[server] connected to db`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const database = client.db("hero-apps");
const appsCollection = database.collection("apps");

// API Routes
app.get("/apps", async (req, res) => {
  try {
    const { limit = 0, skip = 0 } = req.query;
    const apps = await appsCollection
      .find()
      .project({ description: 0 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .toArray();
    res.json(apps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.get("/apps/:id", async (req, res) => {
  try {
    const appId = req.params.id;

    if (appId.length != 24) {
      res.status(400).json({ message: "Invalid App ID" });
      return;
    }
    const query = new ObjectId(appId);
    const app = await appsCollection.findOne({ _id: query });
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Hero Apps API" });
});

app.all(/.*/, (_req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});
