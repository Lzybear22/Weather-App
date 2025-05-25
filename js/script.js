const apiKey = "16dccf2cead0765a8973216039e30661"; // Key from weather API

// Select DOM elements
const inputweather = document.querySelector(".inputweather");
const inputcity = document.querySelector(".inputcity");
const card = document.querySelector(".card");
const tempswitch = document.getElementById("tempswitch")
const tempoption = document.querySelector(".option-temp");
const humidityoption = document.querySelector(".option-humidity");
const descoption = document.querySelector(".option-desc"); // Grabs elements from html 

let usecelsius = false;

// Toggle for C/F
tempswitch.addEventListener("change", () => {
    usecelsius = tempswitch.checked;
  });

// Event listener for form submit
inputweather.addEventListener("submit", async event => {
  event.preventDefault();

  const city = inputcity.value.trim(); // Trim whitespace from input

  // Check if city name is valid
  if (!isValidCity(city)) {
    displayError("Please enter a valid city name.");
    return; // stop here if invalid input
  }

    try {
      // Fetch weather data and display it
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      // Handle errors and display message
      console.error(error);
      displayError(error.message || "An error occurred");
    }
});

// Fetch weather data from API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // City gets the city from user input
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
  showcity.textContent = city;
  showcity.classList.add("showcity");
  card.appendChild(showcity);

  // Show temperature only if checked
  if (tempoption.checked) {
    const showtemp = document.createElement("p");
    let temperature;
    if(usecelsius) {
      temperature = `${(temp - 273.15).toFixed(1)}°C`;
    } else {
      temperature = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    }
    showtemp.textContent = `Temperature: ${temperature}`;
    showtemp.classList.add("showtemp");
    card.appendChild(showtemp);
  }

  // Show humidity only if checked
  if (humidityoption.checked) {
    const showhumidity = document.createElement("p");
    showhumidity.textContent = `Humidity: ${humidity}%`;
    showhumidity.classList.add("showhumidity");
    card.appendChild(showhumidity);
  }

  // Show description only if checked
  if (descoption.checked) {
    const showdesc = document.createElement("p");
    showdesc.textContent = description;
    showdesc.classList.add("showdesc");
    card.appendChild(showdesc);
  }
}

  // Convert temp from Kelvin to Fahrenheit
  let temperature;
  if(usecelsius) {
    temperature = `${(temp - 273.15).toFixed(1)}°C`;
  }
  else {
    temperature = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  }
  showtemp.textContent = temperature;

  // Set text content
  showcity.textContent = city;
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

// Display error messages on the card
function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const showerror = document.createElement("p");
  showerror.textContent = message;
  showerror.classList.add("showerror");

  card.appendChild(showerror);
}

// Validate city name (only letters and spaces allowed)
function isValidCity(city) {
    return /^[a-zA-Z\s]{2,}$/.test(city);
  }