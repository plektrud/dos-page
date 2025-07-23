<script>
  function saveName() {
    const name = document.getElementById('username').value;
    if (name.trim() !== "") {
      localStorage.setItem('dosUserName', name);
      showGreeting();
    }
  }

  function showGreeting() {
    const name = localStorage.getItem('dosUserName');
    if (name) {
      document.getElementById('greeting').textContent = `Willkommen zurück, ${name}!`;
    }
  }

  // Beim Laden der Seite automatisch anzeigen
  window.onload = showGreeting;
</script>
