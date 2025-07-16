🌤 Node.js Weather API Server 

A basic weather backend built using vanilla Node.js — a lightweight weather API server built entirely with Node.js built-in modules — no frameworks like Express were used. It serves as a backend-only application that fetches live weather data from the OpenWeatherMap API, based on a city name provided via the query parameter.


---

⚙ Built With

•	Node.js core modules: (http, https, url)

•	OpenWeatherMap API for weather data

•	Error handling using try-catch for robust response flow


---

✅ Features

Accepts GET requests at /weather?city=CityName

Returns only the required weather details:

• City Name

• Temperature (in °C)

• Weather Description

• Humidity (in %)

• Wind Speed (in m/s)

in JSON format 


Handles invalid cities, missing parameters, and API failures gracefully so that users get helpful messages if something goes wrong.
