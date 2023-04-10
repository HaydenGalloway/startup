document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myListForm");
  const tableBody = document.getElementById("myListTable");
  const playerNameSpan = document.querySelector(".player-name");

  function loadList() {
    tableBody.innerHTML = "";
    const list = JSON.parse(localStorage.getItem("myList")) || [];
    list.forEach((item, index) => {
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td><a href="${item.link}" target="_blank">${item.link}</a></td>
          <td><button class="btn btn-danger" data-index="${index}">-</button></td>
        </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
    updateItemCount(list.length);
  }
  
  function updateItemCount(count) {
    const itemCountSpan = document.getElementById("itemCount");
    itemCountSpan.innerText = `(${count} items)`;
  }  

  function saveList(list) {
    localStorage.setItem("myList", JSON.stringify(list));
    loadList();
    saveScore(list.length);
  }

  function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Are you being Naughty?';
  }

  playerNameSpan.innerText = getPlayerName();

  function saveScore(score) {
    const userName = getPlayerName();
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = updateScores(userName, score, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  function updateScores(userName, score, scores) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    return scores;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const link = document.getElementById("link").value;

    const list = JSON.parse(localStorage.getItem("myList")) || [];
    list.push({ name, description, link });
    saveList(list);

    form.reset();
  });

  tableBody.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const index = event.target.getAttribute("data-index");
      const list = JSON.parse(localStorage.getItem("myList")) || [];
      list.splice(index, 1);
      saveList(list);
    }
  });

  loadList();
});
