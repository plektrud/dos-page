// Öffnen/Schließen des Dropdowns bei Klick auf den Button
document.addEventListener('click', function(event) {
    const btn = event.target.closest('.dropdown-btn');
    if (btn) {
        event.stopPropagation();
        const dropdown = btn.parentElement.querySelector('.dropdown-content');
        dropdown.classList.toggle('show');
        return;
    }

    // Wenn woanders geklickt wird, Dropdown schließen
    document.querySelectorAll('.dropdown-content.show').forEach(drop => {
        drop.classList.remove('show');
    });
});
