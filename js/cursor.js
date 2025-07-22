  // Cursor Positionierung
  const cursor = document.querySelector('.custom-dos-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = (e.pageX + 1) + 'px';
    cursor.style.top = (e.pageY + 2) + 'px';
  });

  // Cursor-Farbe bei Hover über Links
  document.body.addEventListener('mouseover', e => {
    if (e.target.tagName === 'A') {
      cursor.style.color = '#000000';  // Schwarz beim Hover
    }
  });
  document.body.addEventListener('mouseout', e => {
    if (e.target.tagName === 'A') {
      cursor.style.color = '#ffffff';  // Weiß normal
    }
  });

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
