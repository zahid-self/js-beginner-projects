
const searchBtn = document.querySelector('.location-button');
const searchElem = document.querySelector('.input');
const descElem = document.querySelector('.weather-desc');
const feelsElem = document.querySelector('.feels-result');
const rainElem = document.querySelector('.humidity-result');
const windElem = document.querySelector('.wind-result');
const visibilityElem = document.querySelector('.visibilty-result');
const locationElem = document.querySelector('.location');
const tempElem = document.querySelector('.weather-temp');
const hTempElem = document.querySelector('.h-temp-result');
const lTempElem = document.querySelector('.l-temp-result');
const dayElem = document.querySelector('.date-dayname');
const dateElem = document.querySelector('.date-day');

(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();

var now = new Date();

var day = now.getDayName();
var month = now.getMonthName();

searchBtn.addEventListener('click', function(){
    userAction().then((data) => {
        descElem.innerHTML = data.weather[0]['main'];
        visibilityElem.innerHTML = data.visibility;
        windElem.innerHTML = data.wind['speed'];
        tempElem.innerHTML = Math.floor(data.main['temp'] - 273.15) + "°C";
        hTempElem.innerHTML = Math.floor(data.main['temp_max'] - 273.15) + "°C";
        lTempElem.innerHTML = Math.floor(data.main['temp_min'] - 273.15) + "°C";
        visibilityElem.innerHTML = data.visibility;
        locationElem.innerHTML = data.name + " , " + data.sys['country'];
        dayElem.innerHTML = day;
        dateElem.innerHTML = now.getDate() + " " + month + " " + now.getFullYear();
        searchElem.value = "";
    });
});

const userAction = async () => {
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchElem.value + "&appid=your-app-id")
    .then((response) => {
        return response.json().then((data) => {
            return data;
        });
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}