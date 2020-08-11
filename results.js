$(document).ready(function() {

  // global variables
  var petToken = "";
  var petData = {};
  var petLocation = ""; //this is the animals street address
  var organizationID = ""; //this is organizations ID
  var orgWebsite = ""; //this is the organizations website
  var params = ""; //parameter search for petfinder API
  var firstValidIndex = -1; //set as invalid

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

    // if Any breed, or no age is specificed remove breed/age parameters
    if (breed == "Any"){
      params = "type=" + species + "&location=" + zip + "&gender=" + gender + "&age=" + encodeURIComponent(age);
    } else if (breed == "Any" && age == null){
      params = "type=" + species + "&location=" + zip + "&gender=" + gender;
    } else if (age == null) {
      params = "type=" + species + "&location=" + zip + "&gender=" + gender + "&breed=" + breed;
    } else {
      params = "type=" + species + "&location=" + zip + "&gender=" + gender + "&age=" + encodeURIComponent(age) + "&breed=" + breed;
    }

    url = url + params;

    //API access
    $.ajax({
      type: "GET",
      url: url,    
      headers: {"Authorization": "Bearer " + accessToken},
      success: function(response) {
        petData = response;
        createList();
        fillPetCard(firstValidIndex); // Fill petcard with first valid pet info
      }
    });
  }


  //Generate pet list html
  function createList(){
    for (var i = 0; i < petData.animals.length; i++) {

      if (petData.animals[i].primary_photo_cropped != null){
        var petList = $("<a>").addClass("nav-link active").attr("id", "result-list").attr("href", "#").attr("data-index", i);
        var petName = petData.animals[i].name;
        var petThumb = $("<img>").addClass("img-thumbnail").attr("src", petData.animals[i].primary_photo_cropped.small);
        
        petList = petList.append(petThumb, petName);
        $("#list-results").append(petList);
        
        // if pet doesnt have a photo this doesnt run. The first time it does run, firstValidIndex is permanently set to the index of the first animal who has a photo. This is so that the pet card index matches the index on the list, since some indexs wont be valid
        if (firstValidIndex < 0){
          firstValidIndex = i;
        }

      } else {
        // Generate nothing
        }  
    }

    // makes sure that if you go through all of the animals and none have a photo, the list starts at 0 despite how many animals are found. You set it to 0 as a safeguard in case its called later because -1 will make the program crash.
    if (firstValidIndex < 0){
      firstValidIndex = 0;
      $("#noResultsModal").addClass("show").attr("style", "display: block;");
      $(".blackbox").removeClass("hide")
      $("#hidePetCard").addClass("hide")


    }

  }  

  // When no results modal is shown and zipcode button is clicked
  $("#noResultsBtn").on("click", function(event){
    window.location.href = "index.html"; //go to home page
  });

  // Runs the petcard function when selecting pet
  $("#list-results").on("click", function(event){
    
    //validate what pet is selected
    if (event.target.id == "result-list"){
      eTarget = event.target;
      var petIndex = eTarget.dataset.index;

      //giving petcard index of pet
      fillPetCard(petIndex);

      $(".selected").removeClass("selected");
 
      eTarget.classList.add("selected");

   } else {}
  });


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
        
        orgWebsite = response.organization.website;
        if(orgWebsite != null){
          $("#shelterBtn").attr("href", "").attr("target", "_blank").removeClass("hide").text("Learn More");
        } else {
            $("#shelterBtn").addClass("hide").removeAttr("href", "target").text("N/A");
          }

        $("#shelterBtn").on("click", function(){
          $("#shelterBtn").attr("href", orgWebsite);
        });

      }
    }); 
  }  

  //decodes html for pet description
  function decodeHtml(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    str = doc.documentElement.textContent;
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  };

  //fillspetCard
  function fillPetCard (index){
  
    if(index >= petData.animals.length) { 
      // wont run function if its trying to fill the card with an index that doesnt exist, if index is 0 petData.length cannot be greater than 0
      return;
    }

    var thisPet = petData.animals[index];

    //Organization where the animal is located
    organizationID = thisPet.organization_id;
    getOrgLocation();

    if(thisPet.photos.length > 0){
      $(".card-img-top").attr("src", thisPet.photos[0].full); // pet photo
    } else {
      //Generate nothing
    }
    

    $(".card-title").html(thisPet.name); // pet name

    if(thisPet.description != null){
    $(".card-text").html(decodeHtml(thisPet.description)); //pet description
    } else {
      $(".card-text").html("Unfortunately no description is available.");
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
  }


  //Map 
  function renderMarker(coords) {

    // renders the map on the results page
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: coords,
    zoom: 15
    });

    
    // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
    petLocation
    );
    
    // create the marker
    new mapboxgl.Marker()
    .setLngLat(coords)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);
  }

  // mapbox geocoding to turn pet address into coordinates for map
  
  function getCoordinates(address) {
    var apiToken = "pk.eyJ1IjoiY3B0c3Bvb2t5IiwiYSI6ImNrZDlpcDRheDA0b2IzM2pxZDZzNnI2Y2cifQ.0GQCDJlDIwPOy_9uR0Vgsw";
    var mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + apiToken;

    $.ajax({
      url: mapboxURL,
      method: 'GET'
    }).then(function(response) {
      renderMarker(response.features[0].center);
    });
  }
  
});