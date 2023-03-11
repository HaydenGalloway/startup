
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

// Define a function to refresh the table with the current data
function refreshTable() {
  let table = document.getElementById("my-table-body");

  for (let i = 0; i < tableData.length; i++) {
    let row = document.createElement("tr");

    let itemCell = document.createElement("td");
    itemCell.innerHTML = tableData[i].item;
    row.appendChild(itemCell);

    let descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = tableData[i].description;
    row.appendChild(descriptionCell);

    let sourceCell = document.createElement("td");
    sourceCell.innerHTML = tableData[i].source;
    row.appendChild(sourceCell);

    // Add the row to the table
    table.appendChild(row);
  }
}

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
  let itemValue = document.getElementById("item").value;
  let descriptionValue = document.getElementById("description").value;
  let sourceValue = document.getElementById("where-to-buy").value;

  addTableRow(itemValue, descriptionValue, sourceValue);

  document.getElementById("item").value = "";
  document.getElementById("description").value = "";
  document.getElementById("where-to-buy").value = "";
});