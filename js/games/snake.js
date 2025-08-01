let snake = [{ x: 2, y: 2 }];
let direction = "right";
let apple = { x: 5, y: 5 };
let boardSize = 20;
let gameLoop = null;

let currentGameState = { active: null, status: "idle" };

function renderBoard(output) {
  const emptyCell = "▒▒"; // Leeres Feld
  const snakeCell = "██"; // Schlange
  const appleCell = "(}"; // Apfel
  // Spielfeld ohne Rahmen
  const grid = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => emptyCell)
  );
  for (const segment of snake) {
    grid[segment.y][segment.x] = snakeCell;
  }
  grid[apple.y][apple.x] = appleCell;
  // Rahmen erstellen mit doppelten Zeichen
  const horizontal = "─".repeat(boardSize * 2);
  const topBorder = "┌" + horizontal + "┐";
  const bottomBorder = "└" + horizontal + "┘";
  const middleRows = grid.map(row => "│" + row.join("") + "│");
  const layout = [topBorder, ...middleRows, bottomBorder].join("\n");
  const line = document.createElement("p");
  line.textContent = layout;
  output.innerHTML = "";
  output.appendChild(line);
}


function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up": head.y--; break;
    case "down": head.y++; break;
    case "left": head.x--; break;
    case "right": head.x++; break;
  }

  // Kollision mit Wand oder Körper
  if (
    head.x < 0 || head.x >= boardSize ||
    head.y < 0 || head.y >= boardSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    return null;
  }

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    apple = spawnApple();
  } else {
    snake.pop();
  }

  return true;
}

function spawnApple() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function snakeHandle(commandParts, output, woprActive, setGameState) {
  const command = commandParts[0].toLowerCase();
  const arg = commandParts[1];
  const response = document.createElement("p");

  switch (command) {
    case "snake-start":
      snake = [{ x: 2, y: 2 }];
      direction = "right";
      apple = { x: 5, y: 5 };
      currentGameState = { active: "snake", status: "playing" };
      setGameState(currentGameState);
      renderBoard(output);
      response.textContent = "Snake gestartet. Nutze Pfeiltasten!";
      output.appendChild(response);

      if (gameLoop) clearInterval(gameLoop);
      gameLoop = setInterval(() => {
        if (currentGameState.status !== "playing") return;
        const result = moveSnake();
        if (result === null) {
          clearInterval(gameLoop);
          currentGameState = { active: null, status: "ended" };
          setGameState(currentGameState);
          response.textContent = "Game Over!";
          output.appendChild(response);
        }
        renderBoard(output);
      }, 400);
      break;

    case "snake-exit":
      clearInterval(gameLoop);
      currentGameState = { active: null, status: "ended" };
      setGameState(currentGameState);
      response.textContent = "Snake beendet.";
      output.appendChild(response);
      break;

    case "snake-help":
      response.innerHTML = "Snake Commands:<br>snake-start – Neues Spiel starten<br>snake-exit – Spiel verlassen<br>Nutze Pfeiltasten zur Bewegung.";
      output.appendChild(response);
      break;

    case "snake":
      response.textContent = "Nutze snake-start zum Spielen.";
      output.appendChild(response);
      break;

    default:
      response.textContent = `Unbekannter Snake-Befehl: ${commandParts.join(" ")}`;
      output.appendChild(response);
  }
}

// Steuerung per Tastatur
document.addEventListener("keydown", function(event) {
  if (currentGameState.active !== "snake") return;
  switch (event.key) {
    case "ArrowUp":
    case "w":
      direction = "up"; break;
    case "ArrowDown":
    case "s":
      direction = "down"; break;
    case "ArrowLeft":
    case "a":
      direction = "left"; break;
    case "ArrowRight":
    case "d":
      direction = "right"; break;
  }
});
