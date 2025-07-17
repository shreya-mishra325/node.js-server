const http = require('http');
const https = require('https');
const url = require('url');
const API_KEY = '623878137ab28bb1f733637354e80ede';

    const server = http.createServer((req, res) => {

        const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/weather' && req.method === 'GET') {
        const city = parsedUrl.query.city;

        if (!city) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'City name not provided. Please enter a valid city name.'}));
        }

        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        https.get(apiURL, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', ()=> {
            try {
            const weather = JSON.parse(data);

            if (weather.cod !== 200) {
                res.writeHead(weather.cod, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: weather.message }));
                return;
            }

            const response= {
                city: weather.name,
                temperature: weather.main.temp,
                description: weather.weather[0].description,
                humidity: weather.main.humidity,
                windspeed: weather.wind.speed,
            };

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(response));
            } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Error parsing weather data' }));
            }
        });
        }).on('error', () => {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Failed to fetch weather data' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({error: 'Not found'}));
    }
    });

    server.listen(7000, ()=>{
    console.log(`Server running at http://localhost:7000/weather?city=cuttack`);
    });