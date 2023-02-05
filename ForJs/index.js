// console.log('i m working');
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");

const mealDetails = document.querySelector(".meal-details-content");

const recipeCloseBtn = document.getElementById("recipe-close-btn");

const closeBtn=document.getElementById('recipe-close-btn');

searchBtn.addEventListener("click", getMealList);


mealList.addEventListener("click",getRecipe);

closeBtn.addEventListener("click",close=()=>{

mealDetails.parentElement.classList.remove('showRecipe');



})

// for fetching meals from api

// let fetchApi= async (url) =>{
// const response=await fetch(`url`);
// const meals = await response.json();
// return meals;

// }

// function for fetching the meals
async function getMealList() {
  let searchBoxInput = document.getElementById("meal-find").value.trim();

  let html = "";

//   console.log(searchBoxInput);

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBoxInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      // to check is it working 
    //   console.log(data)
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meal-item" id="${meal.idMeal}">
        <div class="meal-img">
          <img
            src="${meal.strMealThumb}"
            alt="food"
          />
        </div>
        <div class="meal-name">
          <h2 style="color: aliceblue">${meal.strMeal}</h2>
          <a href="" class="recipe-btn">Link To Recipe</a>
        </div>
      </div> 
          `;
          mealList.classList.remove('notFound');
        });
      }
      else{
        html =" Sorry , we didn't found any meal !";
        mealList.classList.add('notFound');
      }

      mealList.innerHTML=html;
    });
}


// functiom for getting recipe details

function getRecipe (event) {

  event.preventDefault()

 console.log(event.target);


 if(event.target.classList.contains('recipe-btn')){
// let mealItem= e.target.parentElement.parentElement;
let mealItem=event.target.parentElement.parentElement;
// let mealItem= e.target.parentNode.parentNode;
console.log(mealItem.id);
// console.log(mealItem.dataset.id,"i m id");

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`).then(response=>response.json([])).then(data=> mealRecipeModal(data.meals));

// fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response=>response.json([])).then(data=> mealRecipeModal(data.meals));
 }

}


function mealRecipeModal(meal){
console.log(meal);
meal = meal[0];
let html =` <h2 class="recipe-title">
${meal.strMeal}</h2>
<p class="recipe-category">${meal.strCategory}</p>
<div class="recipe-instruction">
  <h3>Instructions :</h3>
  <p>
    ${meal.strInstructions}
  </p>
</div>
<div class="recipe-meal-img">
  <img
    src="${meal.strMealThumb}"
    alt=""
  />
</div>
<div class="recipe-link">
  <a href="${meal.strYoutube}" target="_blank">Watch video</a>
</div>`;


mealDetails.innerHTML= html;
mealDetails.parentElement.classList.add('showRecipe');

}
