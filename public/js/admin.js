const addNewButton = document.getElementById('addNewBtn');
const modal = document.getElementById('addDishModal');
const closeModalButton = document.getElementById('closeModal');
const addDishForm = document.getElementById('addDishForm');
const formMessage = document.getElementById('formMessage');

const closeModal = () => {
  modal.classList.remove('isOpen');
  modal.setAttribute('aria-hidden', 'true');
};

addNewButton.addEventListener('click', () => {
  modal.classList.add('isOpen');
  modal.setAttribute('aria-hidden', 'false');
 
});

closeModalButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// addDishForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   formMessage.textContent = '';



//   const formData = new FormData(addDishForm);
//   const dish = Object.fromEntries(formData.entries());

//   try {
//     const response = await fetch('/addDish', {
//       // method: 'POST',
//       // headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(dish)
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.error || 'Položku se nepodařilo uložit.');
//     }

//     window.location.reload();
//   } catch (error) {
//     formMessage.textContent = error.message;
//   }
// });
