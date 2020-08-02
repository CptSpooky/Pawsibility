// pseudo code
// 1. create variable selectors for the user inputs and submit button
// 2. create an onclick function with the submit button
// 3. inside of the onclick function, create an ajax object and success function
// 4. use the ajax response to get the users inputs for zip code, species, breed, age, and gender
// 5. dynamically create elements for the results page based on the criteria the user gives
// 6. append those elements to the HTML results page
// 7. when the user clicks on the shelter the pet is at, it brings up a map showing the shelter, using mapbox API 

$(document).ready(function() {
// global variables
var zipCode = $("#userZip").val();
var species = $("#speciesCheck").val();
var breed = $("#inputBreed").val();
var age = $("#ageCheck").val();
var gender = $("").val();
var submitBtn = $("#critSubmit");

// mapbox API call
var mapboxURL = ""




// petfinder API call
var petfinderURL = "https://api.petfinder.com/v2/oauth2/VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC"

});