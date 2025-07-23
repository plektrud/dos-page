document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('username');
  const greeting = document.getElementById('greeting');

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
        }
      }
    });
  }
});

🧠 Optional: Eingabezeile im DOS-Stil
css
