async function loadSection(name) {
  try {
    // Lade Menü HTML
    const menuResp = await fetch(`top-menu/${name}/menu.html`);
    if (!menuResp.ok) throw new Error('Menü nicht gefunden');
    const menuHTML = await menuResp.text();

    // Lade Content HTML
    const contentResp = await fetch(`top-menu/${name}/content.html`);
    if (!contentResp.ok) throw new Error('Content nicht gefunden');
    const contentHTML = await contentResp.text();

    // Setze Inhalte
    document.getElementById('side-menu').innerHTML = menuHTML;
    document.getElementById('main-content').innerHTML = contentHTML;

    // 🧠 Jetzt sind die neuen Elemente im DOM – Initialisiere Username-UI
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
      greeting.textContent = storedName;
    }

    if (input && greeting) {
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const name = input.value.trim();
          if (name !== "") {
            localStorage.setItem('dosUserName', name);
            greeting.textContent = name;
            updateCursorVisibility();
          }
        }
      });

      input.addEventListener('focus', updateCursorVisibility);
      input.addEventListener('blur', updateCursorVisibility);
      input.addEventListener('input', updateCursorVisibility);
    }

    // Maus-Cursor neu binden (wegen neuem Inhalt)
    bindCustomCursor();

  } catch (e) {
    console.error(e);
    document.getElementById('side-menu').textContent = 'Fehler beim Laden des Menüs';
    document.getElementById('main-content').textContent = 'Fehler beim Laden des Inhalts';
  }
}
