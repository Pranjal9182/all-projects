const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const body = document.body;

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
    const currentTime = weather_data.dt;
    const sunrise = weather_data.sys.sunrise;
    const sunset = weather_data.sys.sunset;

    const isDay = currentTime >= sunrise && currentTime < sunset;
    const weatherMain = weather_data.weather[0].main;

    //  background control
    switch (weatherMain) {

        case 'Clear':
            //  Day |  Night
            weather_img.src = isDay
                ? "./Assets/clear.png"
                : "./Assets/moon-and-stars.png";

            document.body.style.background = isDay
                ? "linear-gradient(to right, #56ccf2, #2f80ed)"   // day sky
                : "linear-gradient(to right, #141e30, #243b55)";  // night sky
            break;

        case 'Clouds':
            if (desc.includes("overcast")) {
                //  full cloudy
                weather_img.src = isDay
                    ? "./Assets/cloud.png"
                    : "./Assets/dark.png";

                document.body.style.background = isDay
                    ? "linear-gradient(to right, #bdc3c7, #2c3e50)"
                    : "linear-gradient(to right, #232526, #414345)";
            } else {
                // partly cloudy
                weather_img.src = isDay
                    ? "./Assets/partly-cloudy.png"
                    : "./Assets/night.png"; // better: partly-cloudy-night.png

                document.body.style.background = isDay
                    ? "linear-gradient(to right, #89f7fe, #66a6ff)"
                    : "linear-gradient(to right, #0f2027, #203a43)";
            }
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            //  rain
            weather_img.src = "./Assets/rain.png";

            document.body.style.background =
                "linear-gradient(to right, #4b79a1, #283e51)";
            break;

        case 'Mist':
        case 'Haze':
        case 'Fog':
        case 'Smoke':
            //  fog
            weather_img.src = "./Assets/mist.png";

            document.body.style.background =
                "linear-gradient(to right, #757f9a, #d7dde8)";
            break;

        case 'Snow':
            //  snow
            weather_img.src = "./Assets/snow.png";

            document.body.style.background =
                "linear-gradient(to right, #e6dada, #274046)";
            break;

        default:
            // fallback
            weather_img.src = "./Assets/cloud.png";

            document.body.style.background =
                "linear-gradient(to right, #74ebd5, #ACB6E5)";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});