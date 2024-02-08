const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('dist'))

module.exports = app;

// Root path
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// API post path
app.post('/api/coordinates', async (req, res) => {
    // Declare API URLs
    const radarApiUrl = 'https://api.radar.io/v1/search/autocomplete?query=';
    const weatherApiUrl = 'https://api.weatherapi.com/v1/future.json?';
    const pixabayApiUrl = 'https://pixabay.com/api/?'
    let responsePackage = [] // Package for the contents of various API requests

    try {
        // Location API call
        const locationApiResponse = await fetch(`${radarApiUrl}${req.body.city}`, {
            method: 'GET',
            headers: {
                'Authorization': `${process.env.RADAR_KEY}`
            }
        });
        const locationJsonData = await locationApiResponse.json();
        responsePackage.push(locationJsonData)

        // Weather API call
        const weatherApiResponse = await fetch(`${weatherApiUrl}key=${process.env.WEATHER_KEY}&q=${req.body.city}&dt=${req.body.date}`);
        const weatherJsonData = await weatherApiResponse.json();
        responsePackage.push(weatherJsonData)

        // Image API call
        const pixaApiResponse = await fetch(`${pixabayApiUrl}key=${process.env.PIXA_KEY}&q=${req.body.city}&image_type=photo`)
        const pixaJsonData = await pixaApiResponse.json();
        responsePackage.push(pixaJsonData)

        // Send craft response package back to the client
        res.send(responsePackage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// designates what port the app will listen to for incoming requests
if (process.env.NODE_ENV !== 'test') {
    app.listen(8081, function () {
      console.log('Example app listening on port 8081!')
    });
  }

  module.exports = app;
