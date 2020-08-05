// pseudo code
// 1. create variable selectors for the user inputs and submit button (complete)
// 2. create an onclick function with the submit button (complete)
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
  var gender = $("#genderSelect option:selected").val();
  let ages = $("input[type='checkbox']:checked").map(function(){return $(this).val()}).get();
  var submitBtn = $("#critSubmit");

submitBtn.on("click", function() {
  var zipCode = $("#userZip").val();
  var speciesValue = $("input[name='exampleRadios']:checked").val();
  var breed = $("#inputBreed").val(); 
  var gender = $("#genderSelect option:selected").val();
  var submitBtn = $("#critSubmit");

  let ages = $("input[type='checkbox']:checked").map(function(){return $(this).val()}).get();
  
  

  console.log(zipCode);
  console.log(speciesValue);
  console.log(breed);
  console.log(ages); 
  console.log(gender);

  // save inputs into local storage
  localStorage.setItem('zip code: ', zipCode);
  localStorage.setItem('species: ', speciesValue);
  localStorage.setItem('breed: ', breed);
  localStorage.setItem('ages: ', ages); 
  localStorage.setItem('gender: ', gender);
})

// petfinder API call
var petfinderURL = "https://api.petfinder.com/v2/oauth2/VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC"









// mapbox API call
var apiToken = "pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
var shelterAddress = '200 Petfinder Ln Raleigh NC'; // add the address of the shelter from data pulled from petfinder APU
var mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + shelterAddress + ".json?access_token=" + apiToken;

$.ajax({
  url: mapboxURL,
  method: 'GET'
}).then(function(response) {
  console.log(response);
})

// renders the map on the results page
mapboxgl.accessToken = 'pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw';
                     var map = new mapboxgl.Map({
                      container: 'map', // Container ID
                      style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
                      center: [-122.25948, 37.87221], // Starting position [lng, lat]
                      zoom: 12, // Starting zoom level
                    });

                    var marker = new mapboxgl.Marker() // Initialize a new marker
                      .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
                      .addTo(map); // Add the marker to the map
                    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
                      accessToken: mapboxgl.accessToken, // Set the access token
                      mapboxgl: mapboxgl, // Set the mapbox-gl instance
                      marker: false, // Do not use the default marker style
                      placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
                      bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
                      proximity: {
                        longitude: -122.25948,
                        latitude: 37.87221
                      } // Coordinates of UC Berkeley
                    });
                    // Add the geocoder to the map
                    map.addControl(geocoder);
                    // After the map style has loaded on the page,
                    // add a source layer and default styling for a single point
                    map.on('load', function() {
                      map.addSource('single-point', {
                        type: 'geojson',
                        data: {
                          type: 'FeatureCollection',
                          features: []
                        }
                      });
                      map.addLayer({
                        id: 'point',
                        source: 'single-point',
                        type: 'circle',
                        paint: {
                          'circle-radius': 10,
                          'circle-color': '#448ee4'
                        }
                      });
                      // Listen for the `result` event from the Geocoder
                      // `result` event is triggered when a user makes a selection
                      // Add a marker at the result's coordinates
                      geocoder.on('result', function(ev) {
                        map.getSource('single-point').setData(ev.result.geometry);
                      });
                    });


});

