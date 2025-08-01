import { tttHandle } from "./games/tictactoe.js";
import { snakeHandle } from "./games/snake.js";

const input = document.getElementById("commandInput");
const promptSpan = document.querySelector("#prompt span");
const output = document.getElementById("output");
const commandInput = document.getElementById("commandInput");
const usernameDisplay = document.getElementById("usernameDisplay");
const statusDisplay = document.getElementById("statusDisplay");
const gameState = {
  active: null,   // z. B. "ttt", "snake", ...
  status: "idle", // "idle", "playing", "paused", "ended"
};

// Initiale Variablen
let username = localStorage.getItem("username") || null;
let status = localStorage.getItem("status") === "true";
let woprActive = localStorage.getItem("wopr") === "true";
let maxLines = woprActive ? 45 : 5;

if (woprActive) {
  output.classList.add("wopr-mode");
  commandInput.classList.add("wopr-mode");

  // Falls du den Prompt-Span ausblenden willst:
  if (promptSpan) {
    promptSpan.style.display = "none";
  }

  // Zeilenanzahl aktualisieren
  maxLines = 45;
}

// HTML beim Laden aktualisieren
if (usernameDisplay && username) {
  usernameDisplay.textContent = `${username}`;
}
if (statusDisplay) {
  statusDisplay.textContent = `${status ? "eingeloggt" : "nicht eingeloggt"}`;
}

// Fokus beim Laden
window.addEventListener("load", () => input.focus());

// Fokus zurückholen, wenn verloren
input.addEventListener("blur", () => {
  setTimeout(() => input.focus(), 0);
});

// Fokus bei Klick auf die Seite
document.addEventListener("click", () => input.focus());

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const now = new Date(); 
    const commandRaw = input.value.trim();
    const commandParts = commandRaw.split(" ");
    const command = commandParts[0].toLowerCase();
    input.value = "";

    const newLine = document.createElement("p");

function getWelcomeMessage(username) {
  if (username.toUpperCase() === "FALKEN") {
    return "Greetings Professor Falken. <br>Shall we play a game?";
  } else {
    return `Hallo ${username}, Sie sind jetzt eingeloggt.`;
  }
}

function runLogout() {
  username = null;
  gameState.active = null;
  gameState.status = "idle";
  status = false;
  woprActive = false;
  localStorage.removeItem("username");
  localStorage.setItem("status", "false");
  localStorage.removeItem("wopr");
  output.classList.remove("wopr-mode");
  commandInput.classList.remove("wopr-mode");
  if (promptSpan) {
    promptSpan.style.display = "";
  }
  maxLines = 5;
  output.innerHTML = "";
}    

const systemCommands = ["login", "logout", "cd", "clear", "date", "exit", "help", "status", "time"];
const woprCommands = ["analyze", "defcon", "exit", "games", "simulate", "logout" ];
const allowedGameCommands = {
  ttt: ["ttt", "ttt-start", "ttt-exit", "ttt-help"],
  snake: ["snake", "snake-start", "snake-exit", "snake-help"],
  quiz: ["quiz", "quiz-start", "quiz-exit", "quiz-help"]
};
    
function getAllowedCommands() {
  let commands = [...systemCommands];
  if (woprActive) {
    commands = commands.concat(woprCommands);
  }
  if (gameState.active && allowedGameCommands[gameState.active]) {
    commands = commands.concat(allowedGameCommands[gameState.active]);
  }
  return commands;
}
    
    switch (command) {   
      case "login":
      if (commandParts.length > 1) {
        runLogout();
        username = commandParts.slice(1).join(" ");
        status = true;
        localStorage.setItem("username", username);
        localStorage.setItem("status", "true");
    
        // WOPR aktivieren, wenn Benutzer "FALKEN"
        if (username.toUpperCase() === "FALKEN") {
          woprActive = true;
          localStorage.setItem("wopr", "true");
    
          // Zeilen erhöhen
          maxLines = 45;
    
          // CSS anpassen (z. B. Hintergrundfarbe ändern)
          output.classList.add("wopr-mode");
          commandInput.classList.add("wopr-mode");
          if (promptSpan) {
            promptSpan.style.display = "none";
          }
        }   
        newLine.innerHTML = getWelcomeMessage(username);
      } else {
        newLine.textContent = "Fehler: Kein Benutzername angegeben.";
      }
      break;
      case "logout":
        runLogout();
      break;
      
      case "cd":
        newLine.textContent = "Verzeichnis geöffnet";
        break;
      case "clear":
        output.innerHTML = "";
        break;
      case "date":
        const day = now.getDate();       // Gibt z. B. 1 statt 01 zurück
        const month = now.getMonth() + 1; // Gibt z. B. 7 statt 07 zurück
        const year = now.getFullYear();
        const date = `${day}.${month}.${year}`;
        newLine.textContent = `Aktuelles Datum: ${date}`;
      break;
      case "exit":
        const link = document.getElementById("esc-link");
        if (link) {
          link.click(); // Simuliert Klick auf den Link
        } else {
          newLine.textContent = "Terminal kann nicht aufgerufen werden.";
        }
        break;
      case "help":
        if (woprActive && gameState.active && allowedGameCommands[gameState.active]) {
          
          newLine.innerHTML += `<br>Game Commands (${gameState.active}):<br>${allowedGameCommands[gameState.active].join("   ")}`;
        } else {
            if (woprActive) {
              newLine.innerHTML += `<br>WOPR Commands:<br>${woprCommands.join("   ")}`;
            } else {
               newLine.innerHTML = `System Befehle:<br>${systemCommands.join("   ")}`;
            }
          }
        output.appendChild(newLine);
        break;
      case "status":
        newLine.textContent = status
          ? `Eingeloggt als: ${username}`
          : "Nicht eingeloggt.";
        break;
      case "time":
        newLine.textContent = `Aktuelle Zeit: ${new Date().toLocaleTimeString('de-DE', { hour: 'numeric', minute: '2-digit', second: '2-digit'})}`;
        break;
      case "ttt":
      case "ttt-start":
      case "ttt-exit":
      case "ttt-help":
        tttHandle(commandParts, output, woprActive, (state) => {
          gameState.active = state.active;
          gameState.status = state.status;
        });
        break;
      case "snake":
      case "snake-start":
      case "snake-exit":
      case "snake-help":
        snakeHandle(commandParts, output, woprActive, (state) => {
          gameState.active = state.active;
          gameState.status = state.status;
        });
        break;
  
      default:
        newLine.textContent = `Unbekannter Befehl: ${commandRaw}`;
    }

    output.appendChild(newLine);

    // HTML aktualisieren
    if (usernameDisplay) {
      usernameDisplay.textContent = username ? `${username}` : "";
    }
    if (statusDisplay) {
      statusDisplay.textContent = `${status ? "eingeloggt" : "nicht eingeloggt"}`;
    }

    while (output.children.length > maxLines) {
      output.removeChild(output.firstChild);
    }
  }
});

// Tastenkürzel: Alt + M öffnet Menüeintrag
document.addEventListener("keydown", function(event) {
  if (event.altKey && event.key.toLowerCase() === "m") {
    const newLine = document.createElement("p");
    newLine.textContent = "Menü über Tastenkürzel geöffnet";
    output.appendChild(newLine);

    while (output.children.length > maxLines) {
      output.removeChild(output.firstChild);
    }
  }
});
