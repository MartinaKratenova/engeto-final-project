const closeNavBtn = document.getElementById("closeNavBtn");
const openNavBtn = document.getElementById("openNavBtn");
const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");

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
mobileLogoutBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('logoutForm').requestSubmit();
});
