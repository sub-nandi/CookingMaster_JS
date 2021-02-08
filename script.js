const submitUserInput = () => {
    const userInput = document.getElementById("mealName").value;
    getAllMealsData(userInput);
};
const getAllMealsData = searchInput => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => displayUserData(data.meals));

};

const displayUserData = meals => {
    const parentDiv = document.getElementById("mealsWrapper");
    meals.forEach(meal => {
        const childDiv = `
      <div onclick = "getSingleMealDetails('${meal.idMeal}')" class="card mt-2 mb-2 me-3 singleMeal">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${meal.strMeal}</h5>

                    </div>
                </div>
                `;
        parentDiv.innerHTML += childDiv;

    });
};

const getSingleMealDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

        .then(res => res.json())
        .then(data => displaySingleMealData(data.meals[0]));

};

const displaySingleMealData = singleMeal => {
    const ingredientImg = document.getElementById("ingredientImg");
    ingredientImg.setAttribute("src", singleMeal.strMealThumb);
    const ingredientLists = document.getElementById("ingredientList");







    for (let i = 1; i <= 20; i++) {
        const element = `strIngredient${i}`;
        if (singleMeal[element] != "") {
            const li = document.createElement('li');
            li.innerText = singleMeal[element];
            ingredientLists.appendChild(li);
        }
    }

    document.getElementById("ingredientsWrapper").style.display = "block";

};
