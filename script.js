$(document).ready(function() {
  //Pseudocode for landing page
// 1. use a geolocation API to ask user to share location (Geolocation.getCurrentPosition())
  // *adds zip code from geolocation to the input box
// if not
// 2. create a variable to select the ID of the zip code inputed by user
// 3. create a variable to select the ID of the get started button
// 4. create an event listener or .on("click") for the start button with an anonymous function (ex = submitBtn.on("click", function(){


// 5. When the submit button is clicked 
// -store the zip code in local storage
// -take you to the search page with a link with href=search.html



//pseudocode for the search/input form
// 1. show the input fields/form 
//  *get zip code from local storage and place in zip code input box
// 2. show the pets that are in that zip code, with no other parameters to specify the search
// 3. create variables to select the IDs associated with each input field (ex) speciesInput.value())
// 4. create a variable that selects the ID of the new submit button (ex) $("#searchSubmitBtn"))
// 5. use $.ajax({}).then(function(data){}) to collect data from API (species, breed, age, gender)
// 6. enter the selected content into text() or HTML()
// 7. append to the container div that will store the pet list
});