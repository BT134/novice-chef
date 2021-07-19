var recipeName = $("#recipe-name");
var ingredients = $("#ingredients-list");
var recipePhoto = $("#recipe-photo");
var cookingInstructions = $("#cooking-instructions");
var recipeVid = $("#youtube");
var ingredientMeasure = $("#measurement-list");
var ingredientList = $("#ingredients-list");


function getParams() {
    var searchParams = document.location.search.split("q=")[1];
    console.log(searchParams);

    queryMeals(searchParams);
}

function queryMeals(searchParams) {
    var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + searchParams;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (response) {
            console.log(response);

            // Prints the name, photo and instructions to page
            recipeName.html(response.meals[0].strMeal);
            cookingInstructions.html(response.meals[0].strInstructions);
            recipePhoto.html("<img src=" + response.meals[0].strMealThumb + ">");

            // Creates an array containing the response object values
            let recipeArr = Object.values(response.meals[0]);
            console.log(recipeArr);

            for (var i = 9; i < 29; i++) {
                printIngredients(recipeArr[i])
            }

            for (var i = 29; i < 49; i++) {
                printMeasurements(recipeArr[i])
            }

//storing the recipe title in local storage to call upon later
var recipeTitle = response.meals[0].strMeal;
           
// Function to fetch API for youtube
async function loadClient() {
    gapi.client.setApiKey("AIzaSyDQosbbyQReZBTZwNu_5cBV3pwaYu00Vzw");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}

gapi.load("client", loadClient);

// Function to execture search on Youtube
async function execute() {
    await loadClient();
    return gapi.client.youtube.search.list({
        "type": 'video',
        "maxResults": 5,
        "order": "relevance",
        "q": recipeTitle
    })
        .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log(response);

        var topResult = response.result.items[0].id.videoId;
        console.log(topResult);

        player.loadVideoById(topResult);
                  
        },
        
        function (err) { console.error("Execute error", err); });
}

window.onload = execute

});
}

// Prints a list of ingredients to the page
function printIngredients(ingredients) {
    console.log(ingredients);
    let ingredient = $("<li>");
    ingredient.html(ingredients);
    ingredientList.append(ingredient);
}

// Prints a list of ingredient measurements to the page
function printMeasurements(measurements) {
    console.log(measurements);
    let measurement = $("<li>");
    measurement.html(measurements);
    ingredientMeasure.append(measurement);
}

getParams();

// Function to load Youtube video into recipe page
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'J3pF2jkQ4vc',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
        }        
    });
     
};


function onPlayerReady(event) {
    event.target.playVideo();
}


setTimeout(() => {$('#hidden').show();}, 3000)
