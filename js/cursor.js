  // Cursor-Funktion für dynamisch geladenen Inhalt (Side + Content)
  function bindCustomCursor() {
    // Cursor auf Links in Side und Main-Content
    document.querySelectorAll('#side-menu a, #main-content a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.color = '#000000';
      });
      link.addEventListener('mouseleave', () => {
        cursor.style.color = '#ffffff';
      });
    });
  }
