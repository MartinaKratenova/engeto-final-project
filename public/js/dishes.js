const mealItems = document.querySelectorAll('.meal');

const all = document.getElementById('all');

const sectionDishes = document.getElementById('dishes');

const dishesData = document.getElementById('dishes-data');

const filterItems = document.querySelectorAll('.filterItem');

const dishItems = JSON.parse(dishesData.dataset.dishes);


//active a remove active




filterItems.forEach(meal => {
  meal.addEventListener('click', () => {

    filterItems.forEach(item => {
      item.classList.remove('active');
    });

    meal.classList.add('active');
  });
});

//

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

  console.log(dishItems);
  const response = dishItems;

  const data = response;

   mealItems.forEach(m => {
    m.addEventListener('click', (e) => {
      const inputValue = e.target.id;
      const filteredMeals = data.filter((v) => {
        return v.category_id === parseInt(inputValue);
      }
      );

      renderMeals(filteredMeals);


    });

  });


  renderMeals(data);

};

all.addEventListener('click', (e) => {

  getAllMeals();
  console.log(all);
  console.log(e.target.id);




});


getAllMeals();



