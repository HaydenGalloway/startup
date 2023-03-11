
let tableData = [];

function addTableRow(item, description, source) {
  let newRow = {
    item: item,
    description: description,
    source: source
  };
  tableData.push(newRow);
  refreshTable();
}

function refreshTable() {
  // Get a reference to the table element
  let table = document.getElementById("list-table");

  // Clear any existing rows from the table
  table.innerHTML = "";

  // Create a new row for each item in the table data array
  for (let i = 0; i < tableData.length; i++) {
    // Create a new row element
    let row = document.createElement("tr");

    // Add a cell for the item
    let itemCell = document.createElement("td");
    itemCell.innerHTML = tableData[i].item;
    row.appendChild(itemCell);

    // Add a cell for the description
    let descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = tableData[i].description;
    row.appendChild(descriptionCell);

    // Add a cell for the source
    let sourceCell = document.createElement("td");
    sourceCell.innerHTML = tableData[i].source;
    row.appendChild(sourceCell);

    // Add the row to the table
    table.appendChild(row);
  }
}

// Add an event listener for the add button
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
  // Get the values from the input fields
  let itemValue = document.getElementById("item-input").value;
  let descriptionValue = document.getElementById("description-input").value;
  let sourceValue = document.getElementById("source-input").value;

  // Add a new row to the table with the input values
  addTableRow(itemValue, descriptionValue, sourceValue);

  // Clear the input fields
  document.getElementById("item-input").value = "";
  document.getElementById("description-input").value = "";
  document.getElementById("source-input").value = "";
});
