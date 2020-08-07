$(document).ready(function() {

  // global variables
  var petToken = "";
  var petData = {};
  var petLocation = ""; //this is the animals street address
  var organizationID = ""; //this is organizations ID
  var orgWebsite = ""; //this is the organizations website

  petFinderAccess();

  // petfinder API Post access call
  function petFinderAccess() {
    $.ajax({
      type: "POST",
      url: "https://api.petfinder.com/v2/oauth2/token",
      data: "grant_type=client_credentials&client_id=VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC&client_secret=EyTeV2BZo5Nve7dLybgTiCKaZ4GxNA9pFcIoaGGu",
      success: function(response) {
        petToken = response.access_token; //Generating token because it expires in an hour, would normally be handled server side 
        generateResults(petToken);
      }
    });
  }  

  // petfinder API Get animals call
  function generateResults(accessToken){

    //Get user input from local storage
    const zip = localStorage.getItem("zipCode");
    const age = localStorage.getItem("ages");
    const gender = localStorage.getItem("gender");
    const species = localStorage.getItem("species");
    const breed = localStorage.getItem("breed");
    
    //Build url string
    var url = "https://api.petfinder.com/v2/animals?"
    var params = "type=" + species + "&location=" + zip + "&gender=" + gender + "&age=" + encodeURIComponent(age) + "&breed=" + breed;
    url = url + params;
    console.log(url);

    //API access
    $.ajax({
      type: "GET",
      url: url,    
      headers: {"Authorization": "Bearer " + accessToken},
      success: function(response) {
        console.log(response);
        createList();
        petData = response;

        //Generate pet list html
        function createList(){
          for (var i = 0; i < response.animals.length; i++) {
          

            if (response.animals[i].primary_photo_cropped != null){
              var petList = $("<a>").addClass("nav-link active").attr("id", "result-list").attr("href", "#").attr("data-index", i);
              var petName = response.animals[i].name;
              var petThumb = $("<img>").addClass("img-thumbnail").attr("src", response.animals[i].primary_photo_cropped.small);
              
              petList = petList.append(petThumb, petName);
              $("#list-results").append(petList);
            } else {
                var petList = $("<a>").addClass("nav-link active").attr("id", "result-list").attr("href", "#").attr("data-index", i);
                var petName = response.animals[i].name;
                var petThumb = $("<img>").addClass("img-thumbnail");
                
                petList = petList.append(petThumb, petName);
                $("#list-results").append(petList);
              }  
          }

          // Pet Card
          $("#list-results").on("click", function(event){
            
            e = event.target;
            var petIndex = e.dataset.index;
            var thisPet = petData.animals[petIndex];

            //Organization where the animal is located
            organizationID = thisPet.organization_id;
            getOrgLocation();
           

            if(thisPet.photos.length > 0){
              $(".card-img-top").attr("src", thisPet.photos[0].full); // pet photo
            } else {
              $(".card-img-top").attr("src", "https://via.placeholder.com/150");
            }

            $(".card-title").html(thisPet.name); // pet name

            if(thisPet.description != null){
            $(".card-text").html(thisPet.description); //pet description
            } else {
              $(".card-text").html("No description is available, check out the shelter website if available for more information!");
            }  

            
            var locationArray = thisPet.contact.address;
            petLocation = locationArray.city + ", " + locationArray.state + ", " + locationArray.postcode;

            //Animals Location
            if (thisPet.contact.address.address2 != null){
              petLocation = locationArray.address2 + ", " + petLocation;
            }
            else if (thisPet.contact.address.address1 != null) {
              petLocation = locationArray.address1 + ", " + petLocation;
            }
            getCoordinates(petLocation);
            // JSON.stringify(localStorage.setItem('pet location: ', petLocation));

            


          });
        }  
      }
    });
  }

  //get organization website
  function getOrgLocation() {
    var urlOrg = "https://api.petfinder.com/v2/organizations/";
    var params = organizationID;
    urlOrg = urlOrg + params;
    $.ajax({
      type: "GET",
      url: urlOrg,    
      headers: {"Authorization": "Bearer " + petToken},
      success: function(response) {
        console.log(response);
        console.log(urlOrg);
        
        orgWebsite = response.organization.website;
        if(orgWebsite != null){
          $("#shelterBtn").attr("href", "").attr("target", "_blank").removeClass("btn-fail").text("Learn More");
        } else {
            $("#shelterBtn").addClass("btn-fail").removeAttr("href", "target").text("N/A");
          }

        $("#shelterBtn").on("click", function(){
          $("#shelterBtn").attr("href", orgWebsite);
        });

      }
    }); 
  }  

  // // mapbox API call
  // var apiToken = "pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
  // var shelterAddress = ''; // add the address of the shelter from data pulled from petfinder APU
  // var mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + shelterAddress + ".json?access_token=" + apiToken;

  // $.ajax({
  //   url: mapboxURL,
  //   method: 'GET'
  // }).then(function(response) {
  //   console.log(response);
  // });


  //  MAP BOX TO DO LIST
  // 1. use shelter address variable to display exact location in map
  // 2. hide map box if no shelter address is given
  //  or.....
  // 2. hide marker and show area on map encoumpassing entire zip code given
  // 3. hide search bar in map
  // 4. change styling of map box to look better on page


    function renderMarker(coords) {

      // renders the map on the results page
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw';
      var map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
        center: coords, // Starting position [lng, lat]
        zoom: 12, // Starting zoom level
      });
          
      // RENDERS MARKER ON ADDRESS
      
      var marker = new mapboxgl.Marker() // Initialize a new marker
       .setLngLat(coords) // Marker [lng, lat] coordinates
        .addTo(map); // Add the marker to the map

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
        // geocoder.on('result', function(ev) {
        //   map.getSource('single-point').setData(ev.result.geometry);
        // });
    });
  }

  // mapbox geocoding to turn pet address into coordinates for map
  
  function getCoordinates(address) {
    var apiToken = "pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
    // var shelterAddress = localStorage.getItem(petLocation); // add the address of the shelter from data pulled from petfinder APU
    console.log(petLocation);
    var mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + apiToken;

    // var temp = "https://api.mapbox.com/geocoding/v5/mapbox.places/501 innovation ave morrisville.json?access_token=pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
  
    $.ajax({
      url: mapboxURL,
      method: 'GET'
    }).then(function(response) {
      console.log('coordinates:', response.features[0].center);
      // console.log(JSON.parse(localStorage.getItem(petLocation)));
      renderMarker(response.features[0].center);
    });
  }

});