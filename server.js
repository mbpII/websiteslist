const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// connecting to database
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://wishlistdb.documents.azure.com:443/";
const key =
  "pqylSI564bqFcK8eDIHnOpdNroD19NRGrtn5JbWMDaEF6bFTFX9jLLX2I61EAIVv8IPXNvY0CiiBACDbZJHVog==";

const client = new CosmosClient({ endpoint, key });

const database = client.database("ToDoList");
const container = database.container("Items");

async function dbQuery() {
  try {
    // querying the database
    const query = "SELECT * FROM c";
    const { resources } = await container.items.query(query).fetchAll();

    // console.log("Database query result:", resources);
    return resources;
  } catch (error) {
    console.error("Error fetching from database:", error);
    throw error;
  }
}

async function dbInsert() {
  try {
    // Inserting into the database
    const websiteList = [
      // insert in this formmat  { id: "4", name: "Urban Outfitters", url: "https://www.urbanoutfitters.com/" }
    ];
    for (const item of websiteList) {
      await container.items.create(item); // Create each item with unique ID
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

app.use(cors());

app.get("/items", async (req, res) => {
  const items = await dbQuery();
  //  console.log("Items fetched:", items);

  res.json(items);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
