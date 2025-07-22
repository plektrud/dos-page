// Dropdown öffnen und schließen
document.querySelector('.dropdown-btn').addEventListener('click', function(event) {
    event.stopPropagation(); // Verhindert, dass das Klick-Event weitergegeben wird
    document.querySelector('.dropdown').classList.toggle('show');
});

// Schließe das Dropdown, wenn irgendwo anders geklickt wird
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelector('.dropdown').classList.remove('show');
    }
});
