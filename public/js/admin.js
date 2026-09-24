const addNewButton = document.getElementById('addNewBtn');
const modal = document.getElementById('addDishModal');
const closeModalButton = document.getElementById('closeModal');
const addDishForm = document.getElementById('addDishForm');

const closeModal = () => {
  modal.classList.remove('isOpen');
  modal.setAttribute('aria-hidden', 'true');
};

addNewButton.addEventListener('click', () => {
  modal.classList.add('isOpen');
  modal.setAttribute('aria-hidden', 'false');
  errorMessage.textContent = '';
});

closeModalButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

addDishForm.addEventListener('submit', async (event) => {
  errorMessage.textContent = '';

  const name = document.getElementById('addDishName');
  const desc = document.getElementById('addDishDescription');
  const price = document.getElementById('addDishPrice');
  const cat = document.getElementById('addDishCategory');

  const isInvalid =
       !name.value.trim()
    || !desc.value.trim()
    || !price.value
    || Number(price.value) === 0
    || !cat.value
    || Number(cat.value) === 0;

  if (isInvalid) {
    event.preventDefault();
    errorMessage.textContent = 'Vyplňte všechna policka.';
    
  }
});
