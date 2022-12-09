//VARIABLES
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("formSubmit");
var cityToCords =
    " http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}";
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var lat = "";
var lon = "";
var apikey = "9a971c3220d79475f9be536dd4515f62";
var apiKey2 = "f768e14492ff74a6238ecb011d8ddefc";
var inputLatAndLong = "lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
var getWeather = "https://api.openweathermap.org/data/2.5/weather?";

var getForcast = "https://api.openweathermap.org/data/2.5/forecast?";
const getDate = new Date();

let day = getDate.getDate();
let month = getDate.getMonth() + 1;
let year = getDate.getFullYear();
let date = `${month}-${day}-${year}`;
var createButtonCount = 0;
var forecastArr = [];
let storage = 0;
let history = [];
let mainIcon = $("#currentIcon");

//FUNCTIONS

//this functions is responsible for form submision by captureing user input
function handleFormSubmit(e) {
    e.preventDefault();
    var input = userInput.value;
    fetchCityCords(input);

  //make an api call with that search term and confirm data is send back
}
//functions is responsible for making api call with the user search term
function fetchCityCords(city) {
    console.log(city);
    var getCityCords =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apikey;
    fetch(getCityCords)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;

        fetchCityWeather();
        fetchCityForecast();
        storage++;
    });
}

//this functions will take the lat and long and get the weather
function fetchCityWeather() {
    fetch(
        getWeather +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey2 +
        "&units=imperial"
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let day = document.getElementById("cityName");
        let thisIcon = data.weather[0].icon;
        var createImg = document.createElement("img");
        createImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + thisIcon + ".png"
        );
        $("#cityName").text(data.name + " (" + date + ") ");
        $("#tempText").text("Temp: " + data.main.temp + "°F");
        $("#windText").text("Wind:  " + data.wind.speed + "MPH");
        $("#humidityText").text("Humidity: " + data.main.humidity + "%");
        var currentCity = data.name;
        day.appendChild(createImg);
        createCityButton(currentCity);
    });
}

//this functions will make a new button
function createCityButton(currentCity) {
    var createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.setAttribute("class", currentCity);
    createButton.className = "my-2 col-12 btn btn-primary " + currentCity;
    createButton.id = "historyButton";
    createButton.textContent = currentCity;

    document.getElementById("history").appendChild(createButton);
    history.push(currentCity);
    var storageName = currentCity;
    var storageContent = $("#historyButton");

    localStorage.setItem("history", JSON.stringify(history));
    console.log($("." + currentCity));

    createButtonCount++;
}
//this will handle the history input
function handleHistorySubmit(e) {
    e.preventDefault();
    console.log(this.textContent);
    var input = this.textContent;
    fetchCityCordsFromHistory(input);
}
//this will be responsible for getting weather from history button
function fetchCityWeatherFromHistory() {
    fetch(
        getWeather +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey2 +
        "&units=imperial"
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let day = document.getElementById("cityName");
        let thisIcon = data.weather[0].icon;
        var createImg = document.createElement("img");
        createImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + thisIcon + ".png"
        );
        $("#cityName").text(data.name + " (" + date + ") ");
        $("#tempText").text("Temp: " + data.main.temp + "°F");
        $("#windText").text("Wind:  " + data.wind.speed + "MPH");
        $("#humidityText").text("Humidity: " + data.main.humidity + "%");
        var currentCity = data.name;
        day.appendChild(createImg);
    });
}
//this will be responsible from getting city cords from history button
function fetchCityCordsFromHistory(input) {
    console.log(input);

    var getCityCords =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    input +
    "&appid=" +
    apikey;
    fetch(getCityCords)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;

        fetchCityWeatherFromHistory();
        fetchCityForecast();
    });
}
//this will featch for the next 5 days
function fetchCityForecast() {
    forecastArr = [];
    fetch(
        getForcast +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey2 +
        "&units=imperial"
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        forecastArr.push(data.list[4]);
        forecastArr.push(data.list[12]);
        forecastArr.push(data.list[20]);
        forecastArr.push(data.list[29]);
        forecastArr.push(data.list[36]);
        appendForecastData();
    });
}
//this will append data to the 5 cards
function appendForecastData() {
  for (let i = 0; i < forecastArr.length; i++) {
    var dayName = forecastArr[i].dt_txt;
    var icon = forecastArr[i].weather[0].icon;
    var temp = forecastArr[i].main.temp;
    var speed = forecastArr[i].wind.speed;
    var humidity = forecastArr[i].main.humidity;
    var day = document.getElementById("Day-" + [i]);
    var createImg = document.createElement("img");
    var createli = document.createElement("li");
    var createli2 = document.createElement("li");
    var createli3 = document.createElement("li");
    createImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + icon + ".png"
    );
    createli.textContent = "Temp: " + temp + "°F";
    createli2.textContent = "Wind: " + speed + " MPH";
    createli3.textContent = "Humidity : " + humidity + " %";
    day.textContent = dayName;
    day.appendChild(createImg);
    day.appendChild(createli);
    day.appendChild(createli2);
    day.appendChild(createli3);
    }
}
//this retrives and appends localstorage
function getLocalStorage() {
    if (JSON.parse(localStorage.getItem("history")) !== null) {
    history = history.concat(JSON.parse(localStorage.getItem("history")));
    }

    console.log("functions is running");
    for (let i = 0; i < history.length; i++) {
    var newButton = document.createElement("button");

    newButton.type = "submit";
    newButton.setAttribute("class", history[i]);
    newButton.className = "my-2 col-12 btn btn-primary " + history[i];
    newButton.id = "historyButton";
    newButton.textContent = history[i];
    document.getElementById("history").appendChild(newButton);
    }
}
//this runs the storage functions on page load
getLocalStorage();
//EVENT LISTENERS
//this listeners for the search button
userForm.addEventListener("submit", handleFormSubmit);
//this handles previous searches buttons(uses jquery bc vanilla wont allow click handlers on ids that havnt been created yet)
$(document).on("click", "#historyButton", handleHistorySubmit);