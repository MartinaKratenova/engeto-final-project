const closeNavBtn = document.getElementById("closeNavBtn");
const openNavBtn = document.getElementById("openNavBtn");

function openNav() {
  document.getElementById("myNav").classList.add("overlayOn");

}

function closeNav() {
  document.getElementById("myNav").classList.remove("overlayOn");

}

closeNavBtn.addEventListener('click', () => {
  closeNav();

});
openNavBtn.addEventListener('click', () => {
  openNav();

});
