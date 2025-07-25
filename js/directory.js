document.addEventListener('click', function(event) {
  const label = event.target.closest('.label');
  if (!label) return;

  const folderElement = label.parentElement;
  const subList = folderElement.querySelector('ul');
  if (subList) {
    subList.classList.toggle('hidden');
  }
});
