async function api(){
    const response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    country(data);
}

async function country(data){
    data.forEach((country) => {
        const countryName = country.name.common;
        const flag = country.flags.svg;
        const capital = country.capital;
        const region = country.region;
        const code = country.cca3;

        const mainPage = document.getElementById("main");
        const main = document.createElement("div");
        main.setAttribute("class","col-xxl-4 col-lg-4 col-md-6 col-sm-12");
        mainPage.appendChild(main);

        main.innerHTML = `
        <div class="card card-1 m-3 p-3" id="card">
        <h5 class="m-0 text-center bg-dark text-light p-3">${countryName}</h5>
        <img src="${flag}" class="card-img-top mt-3" alt="${countryName} flag"/>
        <div class="card-body">
        <p class="card-text text-center"><b>Capital: ${capital}</b></p>
        <p class="card-text text-center"><b>Region: ${region}</b></p>
        <p class="card-text text-center"><b>Country Code: ${code}</b></p>
        <button onClick='getWeather("${capital}")' class="btn btn-secondary d-grid mx-auto rounded-4 p-2 mt-3 fw-bold border-dark border-3" type="button">Click for Weather</button>
        <p class="card-text text-center mt-2 fw-bold" id="weather-${capital}"></p>
        </div>
        </div>`;
    });
}

async function getWeather(capital){
    let api = "6bb41f6fb187de5e728c889dea5fb385";
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api}`);
    const weatherData = await weatherRes.json();
    const mainWeather = weatherData.weather[0].main;
    const temp = weatherData.main.temp;
    const weatherName = weatherData.name;

    const weatherPara = document.getElementById(`weather-${capital}`);
    weatherPara.textContent = `Weather in ${weatherName} : ${mainWeather}, Temp : ${temp}`;
}

api();