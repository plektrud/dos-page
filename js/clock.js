  function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString('de-DE', { day: '1-digit', month: '1-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('de-DE', { hour: '1-digit', minute: '1-digit', second: '1-digit' });
    document.getElementById('clock').textContent = date + ', ' + time;
  }
  setInterval(updateClock, 1000);
  updateClock();
