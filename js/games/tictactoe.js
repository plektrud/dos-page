// games/tictactoe.js

let tttBoard = Array(9).fill(null);
let tttGameActive = false;

function checkWin(player) {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(combo => combo.every(i => tttBoard[i] === player));
}

function computerMove() {
  const free = tttBoard.map((v, i) => v === null ? i : null).filter(i => i !== null);
  if (free.length === 0) return;
  const move = free[Math.floor(Math.random() * free.length)];
  tttBoard[move] = "O";
}

function renderBoard(output) {
  const layout = `
 ${tttBoard[0] || " "} | ${tttBoard[1] || " "} | ${tttBoard[2] || " "}
---+---+---
 ${tttBoard[3] || " "} | ${tttBoard[4] || " "} | ${tttBoard[5] || " "}
---+---+---
 ${tttBoard[6] || " "} | ${tttBoard[7] || " "} | ${tttBoard[8] || " "}
  `;
  const line = document.createElement("p");
  line.innerHTML = `<pre>${layout}</pre>`;
  output.appendChild(line);
}

export function tttHandle(commandParts, output, woprActive) {
  const command = commandParts[0].toLowerCase();
  const arg = commandParts[1];
  const response = document.createElement("p");

  if (!woprActive) {
    response.textContent = "Spiel nur im WOPR-Modus verfügbar.";
    output.appendChild(response);
    return;
  }

  switch (command) {
    case "ttt-start":
      tttBoard = Array(9).fill(null);
      tttGameActive = true;
      response.textContent = "Tic-Tac-Toe gestartet. Du spielst als X (0–8).";
      break;

    case "ttt":
      if (!tttGameActive) {
        response.textContent = "Spiel nicht gestartet. Nutze 'ttt-start'.";
        break;
      }
      const pos = parseInt(arg);
      if (isNaN(pos) || pos < 0 || pos > 8 || tttBoard[pos]) {
        response.textContent = "Ungültiger Zug. Wähle ein freies Feld von 0 bis 8.";
        break;
      }
      tttBoard[pos] = "X";
      if (checkWin("X")) {
        response.textContent = "Du hast gewonnen!";
        renderBoard(output);
        tttGameActive = false;
        break;
      }
      computerMove();
      if (checkWin("O")) {
        response.textContent = "Der Computer hat gewonnen!";
        renderBoard(output);
        tttGameActive = false;
        break;
      }
      if (tttBoard.every(cell => cell)) {
        response.textContent = "Unentschieden!";
        renderBoard(output);
        tttGameActive = false;
        break;
      }
      response.textContent = "Zug ausgeführt.";
      break;

    case "ttt-exit":
      tttBoard = Array(9).fill(null);
      tttGameActive = false;
      response.textContent = "Spiel beendet.";
      break;

    case "ttt-help":
      response.innerHTML = "Tic-Tac-Toe Befehle:<br>ttt-start – Neues Spiel<br>ttt [0-8] – Spielzug<br>ttt-exit – Spiel beenden<br>Nur im WOPR-Modus verfügbar.";
      break;

    default:
      response.textContent = `Unbekannter Tic-Tac-Toe-Befehl: ${commandParts.join(" ")}`;
  }

  output.appendChild(response);
  if (tttGameActive) renderBoard(output);
}
