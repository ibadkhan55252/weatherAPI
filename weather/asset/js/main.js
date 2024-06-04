let day = document.getElementById("day");
let date = document.getElementById("date");
let location_ = document.getElementById("location");
let temp = document.getElementById("temp");
let weatherType = document.getElementById("weather-type");
let feelsLike = document.getElementById("feels-like");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let forecasedays = document.getElementById("forecase-middle");
let input = document.querySelector('input');

window.addEventListener('DOMContentLoaded', ()=>{
  fetchApi()
})



// handel listener to fetch api when enter
let search;
input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    search = e.target.value;
    fetchApi();
  } 
});


// handle function to fetch weather Api
const fetchApi = () => {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=e5583ddc48ce44858a8145320242404&q=${search || "hyderabad pakistan"}%20sindh&days=8&aqi=no&alerts=no1`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let localTime = data.location.localtime;
    day.innerText = new Date(localTime).toLocaleString("default", {weekday: "long"});
    date.innerText = new Date(localTime).toLocaleString("default", {dateStyle: "medium"});
    location_.innerText = `${data.location.name}, ${data.location.country}`;
    temp.innerText = data.current.temp_c;
    weatherType.innerText = data.current.condition.text;
    feelsLike.innerText = data.current.feelslike_c;
    wind.innerText = `${data.current.wind_kph} KM/h`;
    humidity.innerText = `${data.current.humidity}%`;
    let days = data.forecast.forecastday;
    let printHTML = days.reduce((acc, item) => {
      const { date } = item;
      let newDate = new Date(item.date).toLocaleString("default", {weekday: "long"});
      acc += `
        <div class="item">
        <div class="img-wrapper">
            <img src=${`https://${item.day.condition.icon}`} alt="">
        </div>
        <p>${newDate}</p>
        <p>${item.day.avgtemp_c}</p>
    </div>`;
      return acc;
    }, "");
    forecasedays.innerHTML = printHTML;
    document.querySelector('.spinner').classList.add('d-none');
  });
}
function addTime(){
  let myDate = new Date();
  let getHours = myDate.getHours()
  if(getHours >= 5 && getHours < 10){
    console.log('good morning');
  } else if (getHours >= 10 && getHours <= 20){
    console.log('good evening');
  } else if (getHours > 20 && getHours <= 23 || getHours >= 0 && getHours < 5 ){
    console.log('good night');
  }
}
addTime()


