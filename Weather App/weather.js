const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

async function checkWeather(city) {
    const API_Key = "dbe65c65879d912e33d51cff44c2b167";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod != 200) {
        weather_img.src = "./Assets/404.png";
        temperature.innerHTML = "City not found";
        description.innerHTML = "Try another location";
        humidity.innerHTML = "--";
        wind_speed.innerHTML = "--";

        // styling
        weather_img
        temperature.style.color = "#ff4d4d";
        temperature.style.fontSize = "22px";
        temperature.style.fontWeight = "600";

        description.style.color = "#999";
        description.style.fontSize = "14px";

        weather_img.style.width = "120px";
        weather_img.style.opacity = "0.8";
        return;
    }
    // console.log(weather_data);
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}℃`;

    const desc = weather_data.weather[0].description;
    description.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);

    // weather_img.innerHTML=`${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(1)} Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
    if (desc.includes("overcast")) {
        weather_img.src = "./Assets/cloud.png"; // full cloudy (no sun)
    } else {
        weather_img.src = "./Assets/partlyCludy.png"; // sun + cloud
    }
    break;
        case 'Clear':
            weather_img.src = "./Assets/clear.png";
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            weather_img.src = "./Assets/rain.png";
            break;
        case 'Mist':
        case 'Haze':
        case 'Fog':
        case 'Smoke':
            weather_img.src = "./Assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./Assets/snow.png";
            break;

        default:
            weather_img.src = "./Assets/cloud.png"; // fallback
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});