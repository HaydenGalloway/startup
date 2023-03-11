
let tableData = [];

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Mystery player';
}

const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = this.getPlayerName();

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
  let table = document.getElementById("list-table");
  table.innerHTML = "";
  for (let i = 0; i < tableData.length; i++) {
    let row = document.createElement("tr");
    // item
    let itemCell = document.createElement("td");
    itemCell.innerHTML = tableData[i].item;
    row.appendChild(itemCell);
    // description
    let descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = tableData[i].description;
    row.appendChild(descriptionCell);
    // source
    let sourceCell = document.createElement("td");
    sourceCell.innerHTML = tableData[i].source;
    row.appendChild(sourceCell);
    // row
    table.appendChild(row);
  }
}

// Add an event listener for the add button
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
  // Get the values from the input fields
  let itemValue = document.getElementById("item").value;
  let descriptionValue = document.getElementById("description").value;
  let sourceValue = document.getElementById("whereToBuy").value;

  // Add a new row to the table with the input values
  addTableRow(itemValue, descriptionValue, sourceValue);

  // Clear the input fields
  document.getElementById("item").value = "";
  document.getElementById("description").value = "";
  document.getElementById("whereToBuy").value = "";
});
