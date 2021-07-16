var recipeName = $("#recipe-name");
var ingredients = $("#ingredients-list");
var recipePhoto = $("#recipe-photo");
var cookingInstructions = $("#cooking-instructions");
var recipeVid = $("#youtube");
var ingredientMeasure = $("#measurement-list");
var ingredientList = $("#ingredients-list");

function randomMeal() {

    var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php"

    fetch(randomURL)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(response) {
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
    })

    .catch(error => {
        console.log('Error!');
        console.log(error);
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


randomMeal();
