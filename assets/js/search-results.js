var container = $("#results");
var searchTerm = $("#searchTerm");
var searchBtn = $("#search-btn");
var clearBtn = $("#clear-btn");
var searchText = $("#first_name");
var meal = "";
var mealRecipe = $("#recipeLink");
var recipeName = $("#recipe-name");
var savedSearches = [];
var historyList = $("#search-list");

// Get the search item from the URL
function getParams() {
    let searchParams = document.location.search.split("q=")[1];
    console.log(searchParams);

    queryMeals(searchParams);

    let upper = searchParams.toUpperCase();

    searchTerm.html(upper);
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

        if(response.meals === null) {

            let modal = $("#modal");
            modal.css("display", "block");            

            console.log("We have no recipes of this nature, please search again");
        } else {
            for (var i=0; i<response.meals.length; i++) {
                printResults(response.meals[i]);
            }
        }

        if (response.meals !== null){
            savedSearches = JSON.parse(localStorage.getItem("meal"));
            console.log(savedSearches);
            if (savedSearches === null) {
                savedSearches = [];
                savedSearches.push(searchParams.toUpperCase());
                localStorage.setItem("meal", JSON.stringify(savedSearches));
                addToList(searchParams);
            } else {
                if (find(searchParams) > 0) {
                    savedSearches.push(searchParams.toUpperCase());
                    localStorage.setItem("meal", JSON.stringify(savedSearches));
                    addToList(searchParams);
                }
            }
        }
    });
}

// Creates and appends each item from the search, title of recipe and picture
function printResults(searchedMeals) {
    console.log(searchedMeals);
    let row = $("<div class='row'>");
    let recipes = $("<div class='col s4 offset-s2 card blue-grey darken-1 white-text'>");
    let recipeTitle = $("<h3 id='recipe-name'>");
    let photoDiv = $("<div class='photo-div col s4 card-content'>");
    let recipePhoto = $("<span>");
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

// Add the searched term to the search history list
function addToList(m) {
    let list = $("<li>" + m.toUpperCase() + "</li>");
    list.attr("data-value", m.toUpperCase());
    historyList.append(list);
}

// Display the search when it is clicked on from the search history list
function pastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")){
        searchParams = liEl.textContent.trim();
        queryMeals(searchParams);
    }
}

// Clear the search history
function clearHistory(event){
    event.preventDefault();
    savedSearches = [];
    localStorage.removeItem("meal");
    document.location.reload();
}

// Searches for if the search is already saved
function find(m){
    for (var i=0; i<savedSearches.length; i++){
        if (m.toUpperCase() === savedSearches[i]){
            return -1;
        }
    }
    return 1;
}

// Click handlers
searchBtn.on("click", getSearchItem);
mealRecipe.on("click", goToRecipe);
clearBtn.on("click", clearHistory);
$(document).on("click", pastSearch);

getParams();