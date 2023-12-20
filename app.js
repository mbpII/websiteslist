async function getItems() {
  try {
    const response = await fetch("http://localhost:3000/items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // This will log the response from your API
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getItems();
