document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'saveBtn') {
    const input = document.getElementById('username');
    const name = input?.value.trim();
    if (name) {
      localStorage.setItem('dosUserName', name);
      const greeting = document.getElementById('greeting');
      if (greeting) {
        greeting.textContent = `Willkommen zurück, ${name}!`;
      }
    }
  }
});
