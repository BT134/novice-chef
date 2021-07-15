function randomMeal(event) {
    event.preventDefault();

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
    })
    .catch(error => {
        console.log('Error!');
        console.log(error);
    });
}

randomMeal();


function searchRandomMeal() {

    var querystring = "./random.html"

    location.assign(querystring);
}

randomBtn.on("click", searchRandomMeal);
