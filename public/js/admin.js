const addNewButton = document.getElementById('addNewBtn');
const addModal = document.getElementById('addDishModal');
const editModal = document.getElementById('editDishModal');
const closeModalButton = document.getElementById('closeModal');
const closeEditModalButton = document.getElementById('closeEditModal');
const closeDeleteModalButton = document.getElementById('closeDeleteModal');

const addDishForm = document.getElementById('addDishForm');
const editDishForm = document.getElementById('editDishForm');

const deleteModal = document.getElementById('deleteModal');
const cancelDeleteButton = document.getElementById('cancelDelete');
const confirmDeleteButton = document.getElementById('confirmDelete');
const deleteButtons = document.querySelectorAll('.deleteBtn');
const editButtons = document.querySelectorAll('.editBtn');
let deleteForm;

const getFormMessage = (form) => form.querySelector('.form-message');

const closeModal = (modalName) => {
  modalName.classList.remove('isOpen');
  modalName.setAttribute('aria-hidden', 'true');
};

const openModal = (modalName) => {
  modalName.classList.add('isOpen');
  modalName.setAttribute('aria-hidden', 'false');
};

const validateDishForm = (form) => {
  const name = form.querySelector('[name="name"]');
  const description = form.querySelector('[name="description"]');
  const price = form.querySelector('[name="price"]');
  const category = form.querySelector('[name="category_id"]');

  const isInvalid =
    !name.value.trim()
    || !description.value.trim()
    || !price.value
    || Number(price.value) <= 0
    || !category.value
    || Number(category.value) === 0;

  const message = getFormMessage(form);

  if (isInvalid) {
    if (message) {
      message.textContent = 'Vyplňte všechna policka.';
    }
    return false;
  }

  if (message) {
    message.textContent = '';
  }

  return true;
};

const closeAddNewModal = () => {
  closeModal(addModal);
  addDishForm.reset();
};

addNewButton.addEventListener('click', () => {
  addDishForm.reset();
  openModal(addModal);
});

closeModalButton.addEventListener('click', closeAddNewModal);

addModal.addEventListener('click', (event) => {
  if (event.target === addModal) {
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

const fillEditDishForm = (button) => {
  const id = button.dataset.id;
  const name = button.dataset.name;
  const description = button.dataset.description;
  const price = button.dataset.price;
  const categoryId = button.dataset.categoryId;
  const categorySelect = editDishForm.querySelector('#editDishCategory');

  editDishForm.action = `/admin/${id}/update`;
  editDishForm.querySelector('[name="name"]').value = name || '';
  editDishForm.querySelector('[name="description"]').value = description || '';
  editDishForm.querySelector('[name="price"]').value = price || '';
  categorySelect.value = categoryId !== undefined && categoryId !== null && categoryId !== '' ? String(categoryId) : '';
};

editButtons.forEach((editButton) => {
  editButton.addEventListener('click', () => {
    fillEditDishForm(editButton);
    openModal(editModal);
  });
});

closeEditModalButton.addEventListener('click', () => {
  closeModal(editModal);
  editDishForm.reset();
});

editModal.addEventListener('click', (event) => {
  if (event.target === editModal) {
    closeModal(editModal);
    editDishForm.reset();
  }
});

addDishForm.addEventListener('submit', (event) => {
  if (!validateDishForm(addDishForm)) {
    event.preventDefault();
  }
});

editDishForm.addEventListener('submit', (event) => {
  if (!validateDishForm(editDishForm)) {
    event.preventDefault();
  }
});
