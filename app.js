async function getItems() {
  try {
    const response = await fetch("http://localhost:3000/items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // This will log the response from your API
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Function to update the DOM with fetched items
async function updateDOMWithItems() {
  const items = await getItems();
  if (items && items.length > 0) {
    const container = document.getElementById("website-list");
    items.forEach((item) => {
      var li = document.createElement("li");
      li.textContent = item.name + item.url; // Assuming 'item' is a string
      container.appendChild(li);
    });
  }
}

// Call the function when the script loads
updateDOMWithItems();
