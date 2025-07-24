  function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('clock').textContent = date + ', ' + time;
  }
  setInterval(updateClock, 1000);
  updateClock();
