const input = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const maxLines = 5; // maximale Anzahl sichtbarer Einträge

    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        input.value = "";

        const newLine = document.createElement("p");

        switch (command) {
          case "/menu":
            newLine.textContent = "📂 Menü geöffnet";
            break;
          case "/hilfe":
            newLine.textContent = "❓ Hilfe angezeigt";
            break;
          case "/zeit":
            newLine.textContent = `🕒 Aktuelle Zeit: ${new Date().toLocaleTimeString()}`;
            break;
          default:
            newLine.textContent = `⚠️ Unbekannter Befehl: ${command}`;
        }

        output.appendChild(newLine);

        // Alte Zeilen entfernen, wenn Limit erreicht
        while (output.children.length > maxLines) {
          output.removeChild(output.firstChild);
        }
      }
    });

    // Tastenkürzel: Alt + M öffnet Menüeintrag
    document.addEventListener("keydown", function(event) {
      if (event.altKey && event.key.toLowerCase() === "m") {
        const newLine = document.createElement("p");
        newLine.textContent = "🔧 Menü über Tastenkürzel geöffnet";
        output.appendChild(newLine);

        while (output.children.length > maxLines) {
          output.removeChild(output.firstChild);
        }
      }
    });
