let searchBtn = document.querySelector(".search");
let input = document.querySelector("input");

searchBtn.addEventListener("click",function(){
    let cityName = input.value;
    if(cityName == "") return;
    // console.log(cityName);
    fetchAndUpdateUI(cityName);
})

let tempElm = document.querySelector(".tempreture");
let locationElm = document.querySelector(".time_location>p");
let timeElm = document.querySelector(".time_location>span");
let imgElm = document.querySelector(".weather_conditions img");
let conditionElm = document.querySelector(".weather_conditions span");

let apiKey = "687cf6949c7942fb94095345232809";
async function fetchAndUpdateUI(cityName){
    try{
        let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
    let response = await fetch(url);
    let json = await response.json();
    if(json.error){
        alert("Please enter a valid location");
        return;
    }
    // console.log(json);
    // console.log(json.current.temp_c);
    // console.log(json.location.name);
    // console.log(json.current.last_updated);
    // console.log(json.current.condition.icon);
    // console.log(json.current.condition.text);

    let temp = json.current.temp_c;
    let location = json.location.name;
    let time = json.current.last_updated;
    let iconLink = json.current.condition.icon;
    let conditionText = json.current.condition.text;
    updateUI(temp,location,time,iconLink,conditionText);
    }catch(err){
        console.log("error",err);
    }
}

function updateUI(temp,location,time,iconLink,conditionText){
    tempElm.textContent = temp;
    locationElm.textContent = location;
    timeElm.textContent = time;
    conditionElm.textContent = conditionText;
    imgElm.setAttribute("src",iconLink);
}