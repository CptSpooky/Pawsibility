# Pawsibilities - pet finder app
Project 1 - Team 5

Deployed on Github pages [Pawsibilites-Find your furever friend!](https://cptspooky.github.io/Pawsibility/)

## Introduction
Pawsibilites was created to be a user responsive web application to help its user conveniently search for their next potential pet through animal adoption. The users input will access Petfinder.com API for cats or dogs of all breeds that are available for adoption and will show user a map of the shelters location using MapBox API. This project is created with separate HTML, CSS, and Javascript files.

![Home Page](home_pg.jpg)

## Requirements 
* Must use at least two server-side APIs
* OPTIONAL ** Must use a CSS framework other than Bootstrap
* Must be interactive (i.e: accept and respond to user input)
* Use at least one new third-party API
* Must have a polished UI
* Must meet good quality coding standards
* Does not use alerts, confirms or prompts
* Must be deployed to GitHub Pages (edited) 

## Features
* Full responsiveness and browser compatibility 
* Quick ZIP-codes search with the use of a modal
* Use of geocoding to display map 

![Search Modal](search_modal.jpg) 

## How to use?
Users are invited to search for their next furever friend by searching their zip code, type of animal (cat or dog), a specific breed, age preference, and gender preference. The users search can be very specific or broad and a list of available pets for adoption will be generated to show a thumbnail image and the name of the pet. Once the pet name is clicked, the chosen pets enlarged picture and detailed information will pop up to the side along with a map of the shelters location. 

## How does it work?

### The PetFinder API
After getting access to the PetFinder API with AJAX using an access key and token, we stored the token in a global variable so that we could we could easily reference it for any calls that needed access. The populate breeds function takes the value of whatever animal is chosen (cat or dog) and generates the breed list in the form. Upon submission the user input is saved to local storage.

![Script1](https://user-images.githubusercontent.com/66426144/89740573-ef4c8200-da57-11ea-826d-5966f8be01c3.png) 
![Script2](https://user-images.githubusercontent.com/66426144/89740577-f2e00900-da57-11ea-89bc-9babd2044dee.png)

For the results page, the PetFinder API is called again. Global variables are set for the API access token, petData (an empty object that will later be populated with the API's response), petLocation (an empty string that will populated by the animals address and used with the Map Box API to display said location on the map), organizationID, an empty string that will be populated with the shelters ID allowing us to find the shelter website and set it to the variable orgWebsite. Then theres the variable params, an empty string that will be populated with various parameters and inserted into the API url depending on the function. 

![Results1](https://user-images.githubusercontent.com/66426144/89742391-79501700-da67-11ea-9d0e-7e12aa1d0465.png)

the generateResults function grabs the stored user input from local storage and builds the url to grab the animal data dependent on conditions. The createList and fillPetCard functions are activated, the latter passing the firstValidIndex variable.

![Results2](https://user-images.githubusercontent.com/66426144/89742395-7c4b0780-da67-11ea-96fe-036335ee7b54.png)

The createList functions generates the list of animals pulled by the conditions set by the user which were stringed together in the API url. Due to the incomplete database we decided to filter out pets that did not have a photo stored and it caused a discrepency with the animal on the list vs the animal shown on the card. This was fixed by comparing indexs with firstValidIndex which is permanently set to the index of the first animal who has a photo. This is so that the pet card index matches the index on the list.

![Results3](https://user-images.githubusercontent.com/66426144/89742397-7ead6180-da67-11ea-8351-ef55bcaafbb4.png)

The fillPetCard function was passed with the value of index( i, the index of the animal if there are actually results). The index is tested against the data of the results list (petData.animals.length) and exits the function if there are no results or non existant results. The shelter's organization ID is stored in its variable. and the getOrgLocation function is activated. The rest of the function fills in the pet name, description, photo, and builds the address the pet is located. This string is passed into the getCoordinates function.

![Results4](https://user-images.githubusercontent.com/66426144/89934098-1339d000-dbde-11ea-94eb-228291db7f24.png)

### The MapBox API
The pet location is passed into the getCoordinates function, where the MapBox API is utilized to draw out the coordinates by address input. These coordinates are then passed into the renderMarker function and used to generate the map at the pets location, and display the pet address with a marker.

![mapbox](https://user-images.githubusercontent.com/66426144/89743593-a0601600-da72-11ea-823d-8d1e7062fbe9.png)

## Demo

![Site Demo](Pawsibilities.gif) 

## Technologies Used
* Bootstrap - Used to tie together HTML and CSS by creating an organized responsive styling structure for the site.
* Javascript - Used to dynamically change html and and store user-input. 
* jQuery - Used to populate users search criteria within the API's used.
    * Used as event listeners of parent and children elements. 
    * Used to store the variables in local storage to be dynamically displayed in HTML on the results page. 

## Resources Used
* Stackoverflow
* Mapbox
* PetFinder
* W3Schools
* Bootstrap
* GoogleFonts

## License
MIT

## Credits
* Jinhi Ahn (https://github.com/JinhiA) : Results page HTML/CSS
* Mark Speer (https://github.com/mark-speer) : Homepage and modal HTML/CSS
* Garrett Hudson (https://github.com/ghudson46) : MapBox API/map generation and local storage
* Danielle Varela (https://github.com/CptSpooky) : PetFinder API/results generation

