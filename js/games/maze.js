let maze = mazeLayout.map(row => row.split(""));
let player = { x: 1, y: 1 };
let mazeTimer = null;
let timeLeft = 30;
let currentGameState = { active: null, status: "idle" };

function renderMaze(output, gameOver = false, win = false) {
  const display = maze.map((row, y) =>
    row.map((cell, x) => (player.x === x && player.y === y ? "@" : cell)).join("")
  ).join("\n");

  output.innerHTML = "";
  const board = document.createElement("pre");
  board.textContent = display;
  const status = document.createElement("p");
  status.textContent = gameOver ? (win ? "You escaped the maze!" : "Time's up!") : `Time left: ${timeLeft}s`;
  output.appendChild(board);
  output.appendChild(status);
}

function movePlayer(dx, dy, output) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  const target = maze[newY]?.[newX];
  if (target && target !== "#") {
    player.x = newX;
    player.y = newY;
    if (target === "E") {
      clearInterval(mazeTimer);
      currentGameState = { active: null, status: "ended" };
      renderMaze(output, true, true);
      return;
    }
    renderMaze(output);
  }
}

export function mazeHandle(commandParts, output, woprActive, setGameState) {
  const command = commandParts[0].toLowerCase();
  const response = document.createElement("p");

  switch (command) {
    case "maze-start":
      maze = mazeLayout.map(row => row.split(""));
      player = { x: 1, y: 1 };
      timeLeft = 30;
      currentGameState = { active: "maze", status: "playing" };
      setGameState(currentGameState);
      renderMaze(output);
      output.appendChild(response);
      if (mazeTimer) clearInterval(mazeTimer);
      mazeTimer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(mazeTimer);
          currentGameState = { active: null, status: "ended" };
          renderMaze(output, true);
        } else {
          renderMaze(output);
        }
      }, 1000);
      break;

    case "maze-exit":
      clearInterval(mazeTimer);
      currentGameState = { active: null, status: "ended" };
      response.textContent = "Maze exited.";
      output.appendChild(response);
      break;

    case "maze-help":
      response.innerHTML = "Maze Commands:<br>maze-start – Start game<br>maze-exit – Quit<br>Use arrow keys or WASD to move.";
      output.appendChild(response);
      break;

    default:
      response.textContent = `Unknown Maze Command: ${commandParts.join(" ")}`;
      output.appendChild(response);
  }
}

// Steuerung
document.addEventListener("keydown", function(event) {
  if (currentGameState.active !== "maze") return;
  switch (event.key) {
    case "ArrowUp":
    case "w": movePlayer(0, -1, document.body); break;
    case "ArrowDown":
    case "s": movePlayer(0, 1, document.body); break;
    case "ArrowLeft":
    case "a": movePlayer(-1, 0, document.body); break;
    case "ArrowRight":
    case "d": movePlayer(1, 0, document.body); break;
  }
});
