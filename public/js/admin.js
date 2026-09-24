const addNewButton = document.getElementById('addNewBtn');
const modal = document.getElementById('addDishModal');
const closeModalButton = document.getElementById('closeModal');
const closeDeleteModalButton = document.getElementById('closeDeleteModal');

const addDishForm = document.getElementById('addDishForm');
const errorMessage = document.getElementById('formMessage');

const deleteModal = document.getElementById('deleteModal');
const cancelDeleteButton = document.getElementById('cancelDelete');
const confirmDeleteButton = document.getElementById('confirmDelete');
const deleteButtons = document.querySelectorAll('.deleteBtn');
let deleteForm;


const closeModal = (modalName) => {
  modalName.classList.remove('isOpen');
  modalName.setAttribute('aria-hidden', 'true');
};

const openModal = (modalName) => {
  modalName.classList.add('isOpen');
  modalName.setAttribute('aria-hidden', 'false');
};

const closeAddNewModal = () => {
  closeModal(modal);

};

addNewButton.addEventListener('click', () => {
  openModal(modal);
  errorMessage.textContent = '';
});

closeModalButton.addEventListener('click', closeAddNewModal);


modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeAddNewModal();
  }
});

const closeDeleteModal = () => {
  closeModal(deleteModal);
  deleteForm = null;
};

closeDeleteModalButton.addEventListener('click', closeDeleteModal);

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    deleteForm = deleteButton.closest('form');
    openModal(deleteModal);
  });
});

cancelDeleteButton.addEventListener('click', closeDeleteModal);

confirmDeleteButton.addEventListener('click', () => {
  if (deleteForm) {
    deleteForm.submit();
  }
});

deleteModal.addEventListener('click', (event) => {
  if (event.target === deleteModal) {
    closeDeleteModal();
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
