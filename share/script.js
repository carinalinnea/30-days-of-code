const socilLink = document.querySelector('.social-link');
const shareLink = document.querySelector('.share-link');

socilLink.addEventListener('click', function() {
  socilLink.classList.toggle('active');
  shareLink.classList.toggle('active');
})