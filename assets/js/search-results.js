var container = $("#results");
var searchTerm = $("#searchTerm");
var searchBtn = $("#search-btn");
var searchText = $("#first_name");
var meal = "";
var mealRecipe = $("#recipeLink");
var recipeName = $("#recipe-name");

// Get the search item from the URL
function getParams() {
    let searchParams = document.location.search.split("q=")[1];
    console.log(searchParams);

    queryMeals(searchParams);

    searchTerm.html(searchParams);
}

// Fetches the results for the searched term
function queryMeals(searchParams) { 
    let queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchParams;

    fetch(queryURL)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(response) {
        console.log(response);

        if(!response.meals.length) {
            // add in a modula
            console.log("We have no recipes of this nature, please search again");
        } else {
            for (var i=0; i<response.meals.length; i++) {
                printResults(response.meals[i]);
            }
        }
    });
}

// Creates and appends each item from the search, title of recipe and picture
function printResults(searchedMeals) {
    console.log(searchedMeals);
    let row = $("<div class='row'>");
    let recipes = $("<div class='col s4 offset-s1 card blue-grey darken-1 card content white-text'>");
    let recipeTitle = $("<span class='card-title' id='recipe-name'>");
    let photoDiv = $("<div class='photo-div col s4 card card-content'>");
    let recipePhoto = $("<span class='card-title'>");
    let recipeLink = $("<a href='recipe.html?q=" + searchedMeals.idMeal + "'>");

    let photoURL = searchedMeals.strMealThumb;

    recipeTitle.html(searchedMeals.strMeal);
    recipePhoto.html("<img src=" + photoURL + ">");

    container.append(row);
    row.append(recipeLink);
    recipeLink.append(recipes, photoDiv);
    recipes.append(recipeTitle);
    photoDiv.append(recipePhoto);
}

// For a new search
function getSearchItem(event){
    event.preventDefault();
    if (searchText.val().trim() !== "") {
        meal = searchText.val().trim();
        searchMeal(meal);
    }
}

// Replaces the location with the new search term in the URL
function searchMeal(meal) {
    // Modals here instead
    if(!meal){
        console.error("You need to input a meal");
        return;
    }

    let querystring = "./search-results.html?q=" + meal;

    location.assign(querystring);
}

// Takes the user to the recipe page of the chosen meal
function goToRecipe(event) {
    event.preventDefault();

    let querystring = "./recipe.html?q" + recipeName;

    location.assign(querystring);

}

// Click handlers
searchBtn.on("click", getSearchItem);
mealRecipe.on("click", goToRecipe);

getParams();