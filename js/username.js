document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('username');
  const greeting = document.getElementById('greeting');
  const cursor = document.querySelector('.fake-cursor');

  // Funktion: Cursor anzeigen oder ausblenden
  function updateCursorVisibility() {
    if (!input || !cursor) return;
    if (document.activeElement === input || input.value.trim() !== "") {
      cursor.style.visibility = 'hidden';
    } else {
      cursor.style.visibility = 'visible';
    }
  }

  // Initialer Zustand
  updateCursorVisibility();

  // Zeige gespeicherten Namen beim Laden
  const storedName = localStorage.getItem('dosUserName');
  if (storedName && greeting) {
    greeting.textContent = `Willkommen zurück, ${storedName}!`;
  }

  // Reagiere auf Enter-Taste
  if (input && greeting) {
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const name = input.value.trim();
        if (name !== "") {
          localStorage.setItem('dosUserName', name);
          greeting.textContent = `Willkommen zurück, ${name}!`;
          updateCursorVisibility(); // Cursor ausblenden nach Eingabe
        }
      }
    });

    // Cursor-Logik bei Fokus, Blur und Eingabe
    input.addEventListener('focus', updateCursorVisibility);
    input.addEventListener('blur', updateCursorVisibility);
    input.addEventListener('input', updateCursorVisibility);
  }
});
