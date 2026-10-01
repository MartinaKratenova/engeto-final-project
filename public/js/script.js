const closeNavBtn = document.getElementById("closeNavBtn");
const openNavBtn = document.getElementById("openNavBtn");

function openNav() {
  document.getElementById("myNav").classList.add("site-header__overlay--open");

}

function closeNav() {
  document.getElementById("myNav").classList.remove("site-header__overlay--open");

}

closeNavBtn.addEventListener('click', () => {
  closeNav();

});
openNavBtn.addEventListener('click', () => {
  openNav();

});
