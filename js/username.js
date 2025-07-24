function initializeUsernameUI() {
  const input = document.getElementById('username');
  const greeting = document.getElementById('greeting');
  const user = document.getElementById('user');
  const cursor = document.querySelector('.fake-cursor');
  const usernameBox = document.getElementById('username-box');
  const storedName = localStorage.getItem('dosUserName');

if (usernameBox) {
  if (storedName) {
    usernameBox.style.display = 'none'; // Verstecke Eingabe
  } else {
    usernameBox.style.display = 'block'; // Zeige Eingabe
  }
}

  // Funktion zum Aktualisieren der Sichtbarkeit des Cursors
  function updateCursorVisibility() {
    if (!input || !cursor) return;
    if (document.activeElement === input || input.value.trim() !== "") {
      cursor.style.visibility = 'hidden';
    } else {
      cursor.style.visibility = 'visible';
    }
  }

  updateCursorVisibility();

  if (storedName) {
    if (greeting) {
      greeting.textContent = `Willkommen zurück, ${storedName}!`;
    }
    if (user) {
      user.textContent = storedName; // Nur den Usernamen anzeigen
    }
  }

  if (input) {
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const name = input.value.trim();
        if (name !== "") {
          localStorage.setItem('dosUserName', name);
          if (usernameBox) {
              usernameBox.style.display = 'none';
            }
          // Aktualisieren des Begrüßungstextes, je nachdem welche ID vorhanden ist
          if (greeting) {
            greeting.textContent = `Willkommen zurück, ${name}!`;
          }
          if (user) {
            user.textContent = name;
          }
          updateCursorVisibility();
        }
      }
    });

    input.addEventListener('focus', updateCursorVisibility);
    input.addEventListener('blur', updateCursorVisibility);
    input.addEventListener('input', updateCursorVisibility);
  }
}
