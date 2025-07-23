document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'saveBtn') {
    const input = document.getElementById('username');
    const greeting = document.getElementById('greeting');
    const name = input?.value.trim();
    if (name) {
      localStorage.setItem('dosUserName', name);
      if (greeting) {
        greeting.textContent = `Willkommen zurück, ${name}!`;
      }
    }
  }
});

// Beim Laden anzeigen
document.addEventListener('DOMContentLoaded', function () {
  const greeting = document.getElementById('greeting');
  const storedName = localStorage.getItem('dosUserName');
  if (storedName && greeting) {
    greeting.textContent = `Willkommen zurück, ${storedName}!`;
  }
});
