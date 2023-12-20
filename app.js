const { response } = require("express");

// Read list of Items from db
  fetch('http://localhost:3000/websites')
  .then(response => response.json())
  .then(websites => {
    // Process fetched websites
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
