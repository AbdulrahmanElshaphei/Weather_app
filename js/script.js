const apiKey="216e6c61d6b04017a0a144240242110"
let search = document.querySelector("#search")


// current Location
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
        getWeatherData(`${lat},${long}`)
        startApp(`${lat},${long}`)
    })
}else{
    console.log("not Allowed");
}


// Today
let Today_Name = document.querySelector("#Today_Name")
let Today_number = document.querySelector("#Today_number")
let Today_month = document.querySelector("#Today_month")
let todayLocation = document.querySelector("#today_location")
let today_temp = document.querySelector("#today_temp")
let todayCondationImg = document.querySelector("#todayCondationImg")
let todayCondationtext = document.querySelector("#todayCondationtext")
let humidity = document.querySelector("#humidity")
let windspeed = document.querySelector("#windspeed")
let wind_dir = document.querySelector("#wind_dir")

// nextdays
let next_days = document.querySelectorAll(".next_days")
let next_MaxTemp = document.querySelectorAll(".next_MaxTemp")
let next_mintemp = document.querySelectorAll(".next_mintemp")
let next_texttemp = document.querySelectorAll(".next_texttemp")
let next_condition_Img = document.querySelectorAll(".next_condition_Img")

// fetch API
async function getWeatherData(cityName){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=216e6c61d6b04017a0a144240242110&q=${cityName}&days=3`)
    let finalRes = await res.json();
    return finalRes;
}

// Diaplay today
function displayDataToday(data){
    let todayDate = new Date()
    Today_Name.innerHTML=  todayDate.toLocaleDateString("en-us",{weekday:"long"})
    Today_month.innerHTML=  todayDate.toLocaleDateString("en-us",{month:"long"})
    Today_number.innerHTML=  todayDate.getDate()
    todayLocation.innerHTML = data.location.name
    today_temp.innerHTML = data.current.temp_c+"<sup>o</sup>"+"C"
    todayCondationImg.setAttribute("src",data.current.condition.icon)
    todayCondationtext.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    windspeed.innerHTML = data.current.wind_kph+"km/h"
    wind_dir.innerHTML = data.current.wind_dir
}

// display nextDays
function displaynextDays(data){
    let forecastData = data.forecast.forecastday
    for(let i=0;i<2;i++){
        let nextDate= new Date(forecastData[i+1].date)
        next_days[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"})
        next_MaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c+"<sup>o</sup>"+"C"
        next_mintemp[i].innerHTML=forecastData[i+1].day.mintemp_c+"<sup>o</sup>"+"C"
        next_texttemp[i].innerHTML=forecastData[i+1].day.condition.text
        next_condition_Img[i].setAttribute("src",forecastData[i+1].day.condition.icon)
    }
}

// Start program
async function startApp(city){
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayDataToday(weatherData)
        displaynextDays(weatherData)
    }
}


// Search
search.addEventListener("input",function(){
    startApp(search.value)
})