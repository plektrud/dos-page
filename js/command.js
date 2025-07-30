const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const usernameDisplay = document.getElementById("usernameDisplay");
const statusDisplay = document.getElementById("statusDisplay");
const maxLines = 5;

// Initiale Variablen
let username = localStorage.getItem("username") || null;
let status = localStorage.getItem("status") === "true";

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
    const commandRaw = input.value.trim();
    const commandParts = commandRaw.split(" ");
    const command = commandParts[0].toLowerCase();
    input.value = "";

    const newLine = document.createElement("p");

    switch (command) {
      case "cd":
        newLine.textContent = "Verzeichnis geöffnet";
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
        newLine.textContent = "CD     DATE     HELP     LOGIN     LOGOUT     STATUS     TIME\n"
          + "weitere Hilfe...";
        break;


      case "login":
        if (commandParts.length > 1) {
          username = commandParts.slice(1).join(" ");
          status = true;
          localStorage.setItem("username", username);
          localStorage.setItem("status", "true");
          newLine.textContent = `Benutzer "${username}" erfolgreich angemeldet.`;
        } else {
          newLine.textContent = "Fehler: Kein Benutzername angegeben.";
        }
        break;
      case "logout":
        username = null;
        status = false;
        localStorage.removeItem("username");
        localStorage.setItem("status", "false");
        newLine.textContent = "Benutzer wurde abgemeldet.";
        break;
      case "status":
        newLine.textContent = status
          ? `Eingeloggt als: ${username}`
          : "Nicht eingeloggt.";
        break;
      case "time":
        newLine.textContent = `Aktuelle Zeit: ${new Date().toLocaleTimeString()}`;
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
