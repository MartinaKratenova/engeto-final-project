const mealItems = document.querySelectorAll('.meal');

const all = document.getElementById('all');

const sectionDishes = document.getElementById('dishes');

const dishesData = document.getElementById('dishes-data');

const filterItems = document.querySelectorAll('.filterItem');

const dishItems = JSON.parse(dishesData.dataset.dishes);

const renderCategory = (categoryId) => {
  const meals = categoryId === null
    ? dishItems
    : dishItems.filter((dish) => dish.category_id === Number(categoryId));

  renderMeals(meals);
};


const renderMeals = (meals) => {
  sectionDishes.textContent = '';

  meals.forEach(m => {
    const name = m.name;
    const price = m.price;
    const category_id = m.category_id;
    const description = m.description;

    if (m.name && m.price && m.category_id && m.description) {
      const mealCard = createMealCard(
        m.name,
        m.price,
        m.category_id,
        m.description
      );

      sectionDishes.append(mealCard);
    }
  });
};


//Card creation

const createMealCard = (name, price, category_id, description) => {
  let mealCard = document.createElement('div');
  mealCard.classList.add('dish-card');

  //name
  const divTitle = document.createElement('div');
  divTitle.classList.add("title");

  const nameTag = document.createElement('h3');
  nameTag.textContent = name;
  divTitle.append(nameTag);

  mealCard.append(divTitle);

  // description
  const divText = document.createElement('div');
  divText.classList.add("description");

  const descriptionTag = document.createElement('div');
  descriptionTag.textContent = description;
  divText.append(descriptionTag);

  mealCard.append(divText);


  //price

  const divPrice = document.createElement('div');
  divPrice.classList.add("price-info");

  const priceTextTag = document.createElement('div');
  priceTextTag.textContent = "Cena";
  divPrice.append(priceTextTag);

  const priceTag = document.createElement('div');
  priceTag.textContent = price;
  divPrice.append(priceTag);


  mealCard.append(divPrice);



  return mealCard;


};



const getAllMeals = () => {
  renderCategory(null);
};

const updateCategoryUrl = (categoryId) => {
  const url = new URL(window.location.href);

  if (categoryId === 'all') {
    url.searchParams.delete('category');
  } else {
    url.searchParams.set('category', categoryId);
  }

  window.history.pushState({}, '', url);
};

filterItems.forEach((filter) => {
  filter.addEventListener('click', () => {
    filterItems.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    updateCategoryUrl(filter.id);

    if (filter.id === 'all') {
      getAllMeals();
    } else {
      renderCategory(filter.id);
    }
  });
});

const selectedCategory = new URLSearchParams(window.location.search).get('category');
const selectedFilter = selectedCategory
  ? document.getElementById(selectedCategory)
  : all;

if (selectedFilter) {
  selectedFilter.classList.add('active');
  renderCategory(selectedCategory);
}



