// today variables
let todayDayName = document.getElementById("todayDayName");
let todayDayNumber = document.getElementById("todayDayNumber");
let todayMonth = document.getElementById("todayMonth");
let todayLocation = document.getElementById("todayLocation");
let today_temp = document.getElementById("today_temp");
let today_codition_img = document.getElementById("today_codition_img");
let today_codition_text = document.getElementById("today_codition_text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
// nextday variables
let nextDayName =document.getElementsByClassName("nextDayName");
let nextConditionImg =document.getElementsByClassName("nextConditionImg");
let nextMaxTemp  =document.getElementsByClassName("nextMaxTemp");
let nextMinTemp =document.getElementsByClassName("nextMinTemp");
let nextConditionText =document.getElementsByClassName("nextConditionText");
// search input
let searchInput = document.getElementById("locationinput")
async function weatherdata(city){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=84346601d19b4f3db9d140904241601&q=${city}&days=3`);
    let weatherdata = await weatherResponse.json();
    return weatherdata;
}
// todayweather
function todayWeather(data){
    let todayDate = new Date();
    todayDayName.innerHTML = todayDate.toLocaleDateString('en-US' ,{weekday:"long"});
    todayDayNumber.innerHTML= todayDate.getDate();
    todayMonth.innerHTML =todayDate.toLocaleDateString("en-US" , {month:"long"});
    todayLocation.innerHTML= data.location.name;
    today_temp.innerHTML=data.current.temp_c +"<span><sup>o</sup>C</span>";
    // today_codition_img.setAttribute("src",data.current.condition.icon)
    // today_codition_text.innerHTML = data.current.condition.text;
    humidity.innerHTML=data.current.humidity +"%";
    wind.innerHTML=data.current.wind_degree +"km/h";
    windDirection.innerHTML=data.current.wind_dir;

}

function nextWeather(data){
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c;
        nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text;
        // nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
    }

}
async function alllFun(city="london"){
    let alldata =await weatherdata(city);
    await todayWeather(alldata);
    await nextWeather(alldata);
    nextWeather(alldata)

}

alllFun()
searchInput.addEventListener("input",function(){
    alllFun(searchInput.value)
    console.log(searchInput.value);
})
