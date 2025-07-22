  // Cursor Positionierung
  const cursor = document.querySelector('.custom-dos-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = (e.pageX + 1) + 'px';
    cursor.style.top = (e.pageY + 2) + 'px';
  });

// Cursor-Farbe bei Hover über Links und Dropdown-Button
document.body.addEventListener('mouseover', e => {
  if (e.target.tagName === 'A') {
    cursor.style.color = '#000000';  // Schwarz beim Hover auf Links
  }
  // Überprüfe, ob das Hover über dem Dropdown-Button ist
  else if (e.target.classList.contains('dropdown-btn')) {
    cursor.style.color = '#000000';  // Schwarz beim Hover auf den Dropdown-Button
  }
});

document.body.addEventListener('mouseout', e => {
  if (e.target.tagName === 'A') {
    cursor.style.color = '#ffffff';  // Weiß normal, wenn der Hover auf Link endet
  }
  // Überprüfe, ob der Hover vom Dropdown-Button entfernt wird
  else if (e.target.classList.contains('dropdown-btn')) {
    cursor.style.color = '#ffffff';  // Weiß normal, wenn der Hover vom Dropdown-Button endet
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
