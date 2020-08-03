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
  var speciesValue = $("input[name='exampleRadios']:checked").val();
  var zipCode = $("#userZip").val();
  var speciesValue = $("input[name='exampleRadios']:checked").val();
  var breed = $("#inputBreed").val();
  // var ages;
  var gender = $("#genderSelect option:selected").val();
  var submitBtn = $("#critSubmit");

submitBtn.on("click", function() {
  var zipCode = $("#userZip").val();
  var speciesValue = $("input[name='exampleRadios']:checked").val();
  var breed = $("#inputBreed").val(); 
  var gender = $("#genderSelect option:selected").val();
  // var ages;
  var submitBtn = $("#critSubmit");

  let ages = $("input[type='checkbox']:checked").map(function(){return $(this).val()}).get();
  
  

  console.log(zipCode);
  console.log(speciesValue);
  console.log(breed);
  console.log(ages); // console log age to test
  console.log(gender);

  // save inputs into local storage
localStorage.setItem('zip code: ', zipCode);
localStorage.setItem('species: ', speciesValue);
localStorage.setItem('breed: ', breed);
localStorage.setItem('ages: ', ages); // is returning the value [object Object] in the local storage instead of the array of checkboxes
localStorage.setItem('gender: ', gender);
})








// mapbox API call
var apiToken = "pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
var searchValue = $(""); // add the address of the shelter from data pulled from petfinder APU
var mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + searchValue + ".json?" + apiToken;

$.ajax({
  url: mapboxURL,
  method: 'GET'
}).then(function() {
  
})




// petfinder API call
var petfinderURL = "https://api.petfinder.com/v2/oauth2/VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC"

});