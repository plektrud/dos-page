  // Lade Side-Menu und Content per Fetch
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

      // Maus-Cursor neu binden (wegen neuem Inhalt)
      bindCustomCursor();

    } catch (e) {
      console.error(e);
      document.getElementById('side-menu').textContent = 'Fehler beim Laden des Menüs';
      document.getElementById('main-content').textContent = 'Fehler beim Laden des Inhalts';
    }
  }
