var test = "";
function welpage() {
  let welpage = document.querySelector(".cityname");
  welpage.classList.add("welpage");
  let welcomepage = document.querySelector(".welcomepage");
  welcomepage.innerHTML = `<h1>🌦️ Welcome to Your Ultimate Weather Companion!</h1>
    <p><strong>Hello, Weather Explorer! 🌍</strong></p>
    <p class="bb">Get ready to experience real-time, detailed weather updates for cities around the world.</p>

    <h2>🔍 What You Can Explore:</h2>
    <ul class="bb">
        <li>🌡️ <strong>Current Weather:</strong> Instantly view temperature, humidity, wind speed, pressure, and visibility for your selected city.</li>
        <li>🕰️ <strong>Real-Time Updates:</strong> Stay updated with the latest time and date for every location.</li>
        <li>📅 <strong>Hourly Forecasts:</strong> Plan your day better by checking upcoming weather conditions hour by hour.</li>
        <li>🌅 <strong>Sunrise & Sunset Times:</strong> Never miss a sunrise or sunset again!</li>
        <li>📍 <strong>Location-Based Search:</strong> Get instant weather details by entering the city name or using your current location.</li>
        <li>🌙 <strong>Dark Mode Ready:</strong> Switch to dark mode for a comfortable viewing experience anytime.</li>
    </ul>

    
    <h2>☀️ Why Use Our Weather App?</h2>
    <ul class="bb">
        <li><strong>Accurate Data:</strong> Powered by reliable weather APIs for real-time accuracy.</li>
        <li><strong>Detailed Insights:</strong> From temperature to wind speed and pressure, every detail matters.</li>
        <li><strong>User-Friendly Interface:</strong> Simple and easy to navigate for a better user experience.</li>
    </ul>

    <p>⚡ <strong>Start your weather journey now!</strong></p>`;
}
welpage();
function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function convertMsToKmh(speedInMs) {
  return (speedInMs * 3.6).toFixed(2);
}

function datedisplay() {
  let dt = new Date();
  dt.toLocaleString();

  let time = dt.toLocaleTimeString();
  const etime = document.querySelector(".time");
  etime.innerHTML = time;

  const edate = document.querySelector(".date");
  let date = dt.toDateString();
  edate.innerHTML = date;
}

function displaydata(data) {
  let welpage = document.querySelector(".cityname");
  welpage.classList.remove("welpage");

  let welcomepage = document.querySelector(".welcomepage");
  welcomepage.style.display = "none";

  test = data;

  const city = document.querySelector(".city");
  city.value = "";
  setInterval(datedisplay, 1);
  const cityd = document.querySelector(".cityname");
  cityd.style.visibility = "visible";
  cityd.classList.remove("cnfound");
  const cname = document.querySelector(".cityn");

  const minmax = document.querySelector(".minmax");

  if (data.cod == 404) {
    cname.innerHTML = data.message;

    cityd.classList.toggle("cnfound");
    const weather = document.querySelector(".weather");
    weather.style.visibility = "hidden";

    minmax.style.visibility = "hidden";

    const forcast = document.querySelector(".forcast");
    forcast.style.visibility = "hidden";
    return 0;
  }

  cname.innerHTML = data.name;
  minmax.style.visibility = "visible";
  minmax.innerHTML = `Max Temp: ${Math.floor(
    data.main.temp_max
  )}°C | Min Temp: ${Math.floor(data.main.temp_min)}°C`;

  const weather = document.querySelector(".weather");
  weather.style.visibility = "visible";
  const temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.floor(data.main.temp)}°C`;

  const flike = document.querySelector(".flike");
  flike.innerHTML = `Feels Like:${Math.floor(data.main.feels_like)}°C`;

  const icon = document.querySelector(".imgicon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  );

  const wdetails = document.querySelector(".wdetails");
  wdetails.innerHTML = data.weather[0].description;

  const humidity = document.querySelector(".hdata");
  humidity.innerHTML = `${data.main.humidity}%`;

  const wpdata = document.querySelector(".wpdata");
  wpdata.innerHTML = `${convertMsToKmh(data.wind.speed)} km/h`;

  const pdata = document.querySelector(".pdata");
  pdata.innerHTML = `${data.main.pressure}hPa`;

  const vdata = document.querySelector(".vdata");
  vdata.innerHTML = `${data.visibility / 1000}KM`;

  const srdata = document.querySelector(".srdata");
  srdata.innerHTML = `${convertUnixToTime(data.sys.sunrise)}`;

  const ssdata = document.querySelector(".ssdata");
  ssdata.innerHTML = `${convertUnixToTime(data.sys.sunset)}`;
}

function displayforecast(data) {
  // test=data;

  if (data.cod == 404) {
    const population = document.querySelector(".population");
    population.style.visibility = "hidden";

    const forcast = document.querySelector(".forcast");
    forcast.style.visibility = "hidden";
    return 0;
  }

  const population = document.querySelector(".population");
  population.style.visibility = "visible";
  population.innerHTML = `Population: ${data.city.population}`;

  const forcast = document.querySelector(".forcast");
  forcast.style.visibility = "visible";

  const forcdata = document.querySelector(".forcdata");
  forcdata.innerHTML = "";

  let array = data.list;
  // test=array;
  array.forEach((element) => {
    // let date=new Date(element.dt_txt);
    let date = new Date(element.dt * 1000);
    let hfdata = document.createElement("div");
    hfdata.classList.add(`hfdata`);

    let hfdate = document.createElement("div");
    hfdate.classList.add("hfdate");
    hfdate.innerHTML = date.toLocaleDateString();

    let hftime = document.createElement("div");
    hftime.classList.add("hftime");
    hftime.innerHTML = date.toLocaleTimeString();

    let hficon = document.createElement("div");
    hficon.classList.add("hficon");

    let hfimgicon = document.createElement("img");
    hfimgicon.classList.add("hfimgicon");
    hfimgicon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${element.weather[0].icon}@4x.png`
    );

    let hfdesc = document.createElement("div");
    hfdesc.classList.add("hfdesc");
    hfdesc.innerHTML = element.weather[0].description;

    hficon.appendChild(hfimgicon);
    hficon.appendChild(hfdesc);

    let hftemp = document.createElement("div");
    hftemp.classList.add("hftemp");
    hftemp.innerHTML = `${Math.floor(element.main.temp)}°C`;

    let hfwspeed = document.createElement("div");
    hfwspeed.classList.add("hfwspeed");
    hfwspeed.innerHTML = `${convertMsToKmh(element.wind.speed)} km/h`;

    hfdata.appendChild(hfdate);
    hfdata.appendChild(hftime);
    hfdata.appendChild(hficon);
    hfdata.appendChild(hftemp);
    hfdata.appendChild(hfwspeed);

    forcdata.appendChild(hfdata);
  });
}

function fetchdata(city) {
  let weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOURAPIKEY`;
  let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOURAPIKEY`;

  fetch(weather)
    .then((res) => res.json())
    .then(displaydata);
  fetch(forecast)
    .then((res) => res.json())
    .then(displayforecast);
}

function getclocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showposition, errormsg);
  }
}

function showposition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=YOURAPIKEY`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      fetchdata(data[0].name);
    });
}

function errormsg(error) {
  console.log(error.message);
}

function darkmode() {
  let dbtnn = document.querySelector("#dbtn");

  const huicon = document.querySelector(".huicon");
  huicon.src = huicon.src.includes("hicon.png") ? "hicond.png" : "hicon.png";

  const wpwind = document.querySelector(".wpwind");
  wpwind.src = wpwind.src.includes("wpicon.png") ? "wpicond.png" : "wpicon.png";

  const srimg = document.querySelector(".srimg");
  srimg.src = srimg.src.includes("sricon.png") ? "sricond.png" : "sricon.png";

  const ssimg = document.querySelector(".ssimg");
  ssimg.src = ssimg.src.includes("ssicon.png") ? "ssicond.png" : "ssicon.png";

  const pimg = document.querySelector(".pimg");
  pimg.src = pimg.src.includes("picon.png") ? "picond.png" : "picon.png";

  const vimg = document.querySelector(".vimg");
  vimg.src = vimg.src.includes("vicon.png") ? "vicond.png" : "vicon.png";

  const lmenu = document.querySelector(".menu");
  lmenu.src = lmenu.src.includes("menu.png") ? "ligm.png" : "menu.png";

  const menu = document.querySelector(".menuicon");
  menu.classList.toggle("dmenu");

  if (dbtnn.innerHTML === "Dark Mode") {
    dbtnn.innerHTML = "Light Mode";
    dbtnn.classList.replace("dbtn", "lbtn");
  } else {
    dbtnn.innerHTML = "Dark Mode";
    dbtnn.classList.replace("lbtn", "dbtn");
  }

  const container = document.querySelector(".container");
  container.classList.toggle("dark");

  const title = document.querySelector(".title");
  const searchbar = document.querySelector(".searchbar");
  const darkmode = document.querySelector(".darkmode");
  const curloc = document.querySelector(".curloc");
  title.classList.toggle("dbord");
  searchbar.classList.toggle("dbord");
  darkmode.classList.toggle("dbord");
  curloc.classList.toggle("dbord");

  const cityname = document.querySelector(".cityname");
  cityname.classList.toggle("dborde");

  const weather = document.querySelector(".weather");
  weather.classList.toggle("dborde");

  const cityn = document.querySelector(".cityn");
  cityn.classList.toggle("lcityn");

  const city = document.querySelector(".city");
  city.classList.toggle("dcity");

  const cbtn = document.querySelector(".cbtn");
  cbtn.classList.toggle("dcbtn");

  const hfdata = document.querySelectorAll(".hfdata");
  hfdata.forEach((element) => {
    element.classList.toggle("hfdatad");
  });
}

const cbtn = document.querySelector(".cbtn");
cbtn.addEventListener("click", getclocation);
const city = document.querySelector(".city");
city.addEventListener("keypress", () => enterb(event));
function enterb(event) {
  if (event.key == "Enter") {
    fetchdata(city.value);
  }
}

const dbtn = document.querySelector(".dbtn");
dbtn.addEventListener("click", darkmode);

function hideicons() {
  const container = document.querySelector(".container");
  const darkmode = document.querySelector(".darkmode");
  const sbar = document.querySelector(".searchbar");
  const curloc = document.querySelector(".curloc");
  container.classList.toggle("hbtn");
  darkmode.classList.toggle("hidden");
  sbar.classList.toggle("hidden");
  curloc.classList.toggle("hidden");
}

const menu = document.querySelector(".menu");
menu.addEventListener("click", hideicons);
