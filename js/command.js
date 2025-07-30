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
      case "CD":
        newLine.textContent = "Verzeichnis geöffnet";
        break;
      case "HELP":
        newLine.textContent = "Mögliche Befehle";
        newLine.textContent = "CD     DATE     HELP     LOGIN     LOGOUT     STATUS     TIME     ";
        newLine.textContent = "Hilfe 3";
        newLine.textContent = "Hilfe 4";
        newLine.textContent = "Hilfe 5";
        break;
      case "TIME":
        newLine.textContent = `Aktuelle Zeit: ${new Date().toLocaleTimeString()}`;
        break;
      case "DATE":
        newLine.textContent = `Aktuelle Zeit: ${new Date().toLocaleTimeString()}`;
        break;
      case "LOGIN":
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
      case "LOGOUT":
        username = null;
        status = false;
        localStorage.removeItem("username");
        localStorage.setItem("status", "false");
        newLine.textContent = "Benutzer wurde abgemeldet.";
        break;
      case "STATUS":
        newLine.textContent = status
          ? `Eingeloggt als: ${username}`
          : "Nicht eingeloggt.";
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
