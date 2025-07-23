// username.js
export function initUsernameUI() {
  const input = document.getElementById('username');
  const greeting = document.getElementById('greeting');
  const cursor = document.querySelector('.fake-cursor');

  function updateCursorVisibility() {
    if (!input || !cursor) return;
    if (document.activeElement === input || input.value.trim() !== "") {
      cursor.style.visibility = 'hidden';
    } else {
      cursor.style.visibility = 'visible';
    }
  }

  updateCursorVisibility();

  const storedName = localStorage.getItem('dosUserName');
  if (storedName && greeting) {
    greeting.textContent = `Willkommen zurück, ${storedName}!`;
  }

  if (input && greeting) {
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const name = input.value.trim();
        if (name !== "") {
          localStorage.setItem('dosUserName', name);
          greeting.textContent = `Willkommen zurück, ${name}!`;
          updateCursorVisibility();
        }
      }
    });

    input.addEventListener('focus', updateCursorVisibility);
    input.addEventListener('blur', updateCursorVisibility);
    input.addEventListener('input', updateCursorVisibility);
  }
}
