
function getParams() {
    var searchParams = document.location.search.split("q=")[1];
    console.log(searchParams);

    queryMeals(searchParams);
}

function queryMeals(searchParams) { 
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchParams;

    fetch(queryURL)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(response) {
        // add function for adding search query to page eg it will display "Chicken" at the top of the list
        console.log(response);

        if(!response.meals.length) {
            // add in a modula
            console.log("We no recipes of this nature, please search again");
        } else {
            for (var i=0; i<response.meals.length; i++) {
                printResults(response.meals[i]);
            }
        }
    });
}

function printResults(searchedMeals) {
    console.log(searchedMeals);

    
}

getParams();