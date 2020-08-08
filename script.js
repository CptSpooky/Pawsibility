$(document).ready(function() {

  // global variables
  var petToken = "";
  var speciesValue = $("input[name='exampleRadios']:checked");
  var submitBtn = $("#critSubmit");

  // petfinder API Post access call
    $.ajax({
      type: "POST",
      url: "https://api.petfinder.com/v2/oauth2/token",
      data: "grant_type=client_credentials&client_id=VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC&client_secret=EyTeV2BZo5Nve7dLybgTiCKaZ4GxNA9pFcIoaGGu",
      success: function(response) {
        petToken = response.access_token; //Generating token because it expires in an hour, would normally be handled server side 
        //Default dog
        populateBreeds("dog");
      }
    });
    
  //Breeds button activation
  $("#inline_test input[name='exampleRadios']").click(function(){
    var animal = $('input:radio[name=exampleRadios]:checked').val();
    populateBreeds(animal);
  });

  //Breeds selection and generation
  function populateBreeds(animal){
    $.ajax({
      type: "GET",
      url: "https://api.petfinder.com/v2/types/" + animal + "/breeds",    
      headers: {"Authorization": "Bearer " + petToken},
      success: function(response) {
            
        var breedSelect = $("#breedSelect");
        breedSelect.empty(); //clear out existing options
        
        //any breed
        var anyBreed = document.createElement("option");
        anyBreed.value = "Any";
        anyBreed.innerHTML = "Any";
        breedSelect.append(anyBreed);

        //generate breeds
        response.breeds.forEach(e => {
        
          var opt = document.createElement("option");
          opt.value = e.name;
          opt.innerHTML= e.name;
          breedSelect.append(opt);
  
        });
      }
    });
  }
  
  //When submit button is clicked
  submitBtn.on("click", function(event){
    event.preventDefault();
 
    var zipCode = $("#userZip").val()
    var speciesValue = $("input[name='exampleRadios']:checked").val();
    var breed = $("#breedSelect").val(); 
    var gender = $("#genderSelect option:selected").val();
    let ages = $("input[type='checkbox']:checked").map(function(){return $(this).val()}).get();
         
    if (isNaN(parseInt(zipCode)) || zipCode.length != 5) {
      $("#userZip").val("");
      $("#userZip").addClass("submit-fail");
      $("#userZip").attr("placeholder", "Not valid");
    } else {
      // save inputs into local storage
      localStorage.setItem('zipCode', zipCode);
      localStorage.setItem('species', speciesValue);
      localStorage.setItem('breed', breed);
      localStorage.setItem('ages', ages); // is returning the value [object Object] in the local storage instead of the array of checkboxes
      localStorage.setItem('gender', gender);

      window.location.href = "results.html"; //go to results page

    }
    
  }); 
});






// curl -d "grant_type=client_credentials&client_id=VPazYlCS5jiHVKYEa29a1eAD74ZNDsYvXJ0JYtdykdrfmRjsiC&client_secret=EyTeV2BZo5Nve7dLybgTiCKaZ4GxNA9pFcIoaGGu" https://api.petfinder.com/v2/oauth2/token


// curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJWUGF6WWxDUzVqaUhWS1lFYTI5YTFlQUQ3NFpORHNZdlhKMEpZdGR5a2RyZm1SanNpQyIsImp0aSI6ImVlNWM2Njk1Y2RkOGM2YTkwYjRmMWE3ODU4MGJiZDYzMTQ2NGQzMGY2OTk0YjQwYWFmZmZhN2Y5YTJmODRiYzJhMzFjMjY3NjcxOGNiM2VmIiwiaWF0IjoxNTk2NDAwODM5LCJuYmYiOjE1OTY0MDA4MzksImV4cCI6MTU5NjQwNDQzOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.QugEXRT3gCaAgl95CR2IrhkH-3MYquQy5JG-W3vTF-q_RADKO3voNPk1tHHVupYH1ugDZTqfAUMLqlE5dy9KcDd5YDzY3dOlQbNCV4AHWRZ81_C5V4oqfwhNtpXQAzjmT0xX8bp19_M7mE_QEaJndbvTqg8Is9ssvFD_CwQ72w7NsLgHEn_dBk77tCdjhUzr1dwGlpMIKVp7o1ylT9rts1EhLFcxEOVsIY-LnQfSMW-7v8dZ5Bhy1eKQiPQ0HWZTzJ6ceekrtyW_DdJP2ahVbRUdMPjHGKRMvKGdeHSxtMXLbqruskjx6VO5cxW3LxO139kdQEXjaWhCy1NWVpydZw" GET https://api.petfinder.com/v2/animals?type=dog&page=2