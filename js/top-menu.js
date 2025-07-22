  // Menü-Links anklickbar machen (laden neuer Sektionen)
document.querySelectorAll('.top-menu a').forEach(link => {
  link.addEventListener('click', e => {
    const section = link.dataset.section;
    if (section) {
      e.preventDefault();
      loadSection(section);
    }
    // Wenn kein data-section, dann Standardverhalten (Link folgt normal)
  });
});
