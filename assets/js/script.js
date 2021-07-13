var searchBtn = $("#search-btn");
var meal = "";
var mealInput = $("#search");
var randomBtn = $("#random-btn");

function getSearchItem(event){
    event.preventDefault();
    if (mealInput.val().trim() !== "") {
        meal = mealInput.val().trim();
        searchMeal(meal);
    }
}

function searchMeal(meal) {
    // Modals here instead
    if(!meal){
        console.error("You need to input a meal");
        return;
    }

    var querystring = "./search-results.html?q=" + meal;

    location.assign(querystring);
}

function searchRandomMeal(event) {

    var querystring = "./random.html"

    location.assign(querystring);
}

// Create a new html page specifically for the random search.

// also create a new js file and use this code to fetch:

// function randomMeal(event) {
//     event.preventDefault();

//     var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php"

//     fetch(randomURL)
//     .then(function(response) {
//         if(!response.ok) {
//             throw response.json();
//         }
//         return response.json();
//     })
//     .then(function(response) {
//         console.log(response);
//     });
// }

// randomMeal();



searchBtn.on("click", getSearchItem);
randomBtn.on("click", searchRandomMeal);
