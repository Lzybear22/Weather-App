const apiKey = "16dccf2cead0765a8973216039e30661";

// Select DOM elements
const inputweather = document.querySelector(".inputweather");
const inputcity = document.querySelector(".inputcity");
const card = document.querySelector(".card");

// Event listener for form submit
inputweather.addEventListener("submit", async event => {
  event.preventDefault();

  const city = inputcity.value.trim(); // Trim whitespace from input

  if (city) {
    try {
      // Fetch weather data and display it
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      // Handle errors and display message
      console.error(error);
      displayError(error.message || "An error occurred");
    }
  } else {
    displayError("Please enter a city");
  }
});

// Fetch weather data from API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Couldn't get weather data. Please check the city name.");
  }

  return await response.json();
}

// Display weather data on the card
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description }]
  } = data;

  // Clear previous content and show the card
  card.textContent = "";
  card.style.display = "flex";

  // Create elements to display data
  const showcity = document.createElement("h1");
  const showtemp = document.createElement("p");
  const showhumidity = document.createElement("p");
  const showdesc = document.createElement("p");

  // Convert temp from Kelvin to Fahrenheit
  const tempF = ((temp - 273.15) * (9 / 5) + 32).toFixed(1);

  // Set text content
  showcity.textContent = city;
  showtemp.textContent = `${tempF}°F`;
  showhumidity.textContent = `Humidity: ${humidity}%`;
  showdesc.textContent = description;

  // Add CSS classes
  showcity.classList.add("showcity");
  showtemp.classList.add("showtemp");
  showhumidity.classList.add("showhumidity");
  showdesc.classList.add("showdesc");

  // Append elements to the card
  card.appendChild(showcity);
  card.appendChild(showtemp);
  card.appendChild(showhumidity);
  card.appendChild(showdesc);
}

// Display error messages on the card
function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const showerror = document.createElement("p");
  showerror.textContent = message;
  showerror.classList.add("showerror");

  card.appendChild(showerror);
}
