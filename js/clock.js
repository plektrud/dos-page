  function updateClock() {
    const now = new Date();
    const day = now.getDate();       // Gibt z. B. 1 statt 01 zurück
    const month = now.getMonth() + 1; // Gibt z. B. 7 statt 07 zurück
    const year = now.getFullYear();
    const date = `${day}.${month}.${year}`;
    const time = now.toLocaleTimeString('de-DE', { hour: 'numeric', minute: '2-digit', second: '2-digit'});
    document.getElementById('clock').textContent = date + ', ' + time;
  }
  setInterval(updateClock, 1000);
  updateClock();
