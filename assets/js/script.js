// Variable declarations
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-sbt");

var weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=";

var apiKey = "548fb8d520ab6234754d0ab0955f525f";

var dayForecast=document.getElementById('current-forecast');
// functions
// function is responsible for getting the lat and lon for the city passed
function fetchCoordinates(city){
    // this will make the call to get the cordinates for that city
    var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";
    var apiCall = rootEndpoint + city +"&limit=5" + "&appid=" + apiKey;

    // input api call with pass key
    fetch(apiCall)
    .then(function(response){
        return response .json();
    })
    .then(function(data){
        var lat = data[0].lat;
        var lon = data[0].lon;
        fetchWeather(lat,lon)
    })
}
// responsible for the dymanic creation of the cards based on what the user wants
function renderCards(){
    // dom manipulation for cards
}
// var day = dayjs().format(M/DD/YYYY);
// function responsible for making api with user searchterm
function fetchWeather(lat, lon) {
    var apiCall = weatherApi + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
    // https://api.openweathermap.org/data/2.5/weather?lat= +lat +&lon=+ lon + &appid= + apiKey
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

    fetch(apiCall)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        console.log(data.main.temp);
        var cityName = data.name;
        var icon = data.weather[0].icon;
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var speed = data.wind.speed;
        // take the temp and lets display to the user as an h1
        var h1El = document.createElement('h1');
        // add text to 
        h1El.innerHTML =    `<div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h1 class="card-title">${cityName}  ${icon}</h5>
                                    <h5 class="card-subtitle temp mb-2 text-muted">Temp: ${temp}F</h5>
                                    <h5 class="card-subtitle wind">Wind: ${speed} MPH</h5>
                                    <h5 class="card-subtitle humidity>Humidity: ${humidity} %</h5>
                                </div>
                            </div>`;
        // append to element
        dayForecast.append(h1El);
    });

//   render the temp as an h1 to the user

}
function renderDayForecast(){
// place, date, temp, wind and humity
}
// this function is responsible for form submission and capturing user input
function handleFormSubmit() {
  // pulls input data value
    var city = userInput.value; 
    console.log(city);
    
  //   make an api call with that search term and confirm data is sent back
    fetchCoordinates(city)
}
// Event listners
userForm.addEventListener("click", function(event){
    event.preventDefault();
    handleFormSubmit();


});

// local storage
// localStorage.getItem('cities')
// localStorage.setItem('cities', )
// create an empty array in global storage
// push that value(name of the city) to that array
// ["austin", "denver" ,]