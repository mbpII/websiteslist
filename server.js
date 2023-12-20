const express = require('express');
const app = express();
const port = 3000;

// connecting to database
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://wishlistdb.documents.azure.com:443/";
const key = "pqylSI564bqFcK8eDIHnOpdNroD19NRGrtn5JbWMDaEF6bFTFX9jLLX2I61EAIVv8IPXNvY0CiiBACDbZJHVog==";

const client = new CosmosClient({ endpoint, key });

async function dbFunctions() {
  const database = client.database("ToDoList");
  const container = database.container("Items");
    // Inserting into the database
    const websiteList = [
       // insert in this formmat  { id: "4", name: "Urban Outfitters", url: "https://www.urbanoutfitters.com/" }
      ];
        for (const item of websiteList) {
          await container.items.create(item); // Create each item with unique ID
       }

    // querying the database
  const query = "SELECT * FROM c";
  const { resources } = await container.items.query(query).fetchAll();

  console.log(resources);
}
//db error handling 
dbFunctions().catch((error) => {
  console.error(error);
});


app.listen(port, () => console.log(`Server listening on port ${port}`));
