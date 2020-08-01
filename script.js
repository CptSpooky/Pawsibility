$(document).ready(function() {
  //Pseudocode for landing page
// 1. use a geolocation API to ask user to share location (Geolocation.getCurrentPosition())
// if not
// 2. create a variable to select the ID of the zip code input
// 3. create a variable to select the ID of the get started button
// 4. create an event listener or .on("click") for the start button with an anonymous function (ex = submitBtn.on("click", function(){


// 5. When the submit button is clicked 
// -show a list of all pets in that zip code
// & show the input form so the user can select more specific search criteria
// this can be done by adding a .hide class to all the content on the landing page and removing hide classes from the div that holds the input form and stores the pet data
// or... the submit button can link to another HTML sheet with the form and pet data


//pseudocode for the search/input form
// 1. show the input fields/form 
// - can be done by removing a .hide class or by creating the form in a seperate html page that is linked from the submit button
// 2. show the pets that are in that zip code, with no other parameters to specify the search
// 3. create variables to select the IDs associated with each input field (speciesInput.value())
// 4. create a variable that selectes the ID of the new submit button 
// 5. use $.ajax({}).then(function(data){}) to collect data from API (species, breed, age, gender)
// 6. enter the selected content into text() or HTML()
// 7. append to the container div that will store the pet list
});