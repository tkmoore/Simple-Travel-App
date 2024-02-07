const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/api/coordinates', async (req, res) => {
    const radarApiUrl = 'https://api.radar.io/v1/search/autocomplete?query=';
    const weatherApiUrl = 'https://api.weatherapi.com/v1/future.json?';
    const pixabayApiUrl = 'https://pixabay.com/api/?'
    let responsePackage = []

    try {
        const locationApiResponse = await fetch(`${radarApiUrl}${req.body.city}`, {
            method: 'GET',
            headers: {
                'Authorization': `${process.env.RADAR_KEY}`
            }
        });
        const locationJsonData = await locationApiResponse.json();
        responsePackage.push(locationJsonData)

        const weatherApiResponse = await fetch(`${weatherApiUrl}key=${process.env.WEATHER_KEY}&q=${req.body.city}&dt=${req.body.date}`);
        const weatherJsonData = await weatherApiResponse.json();
        responsePackage.push(weatherJsonData)

        const pixaApiResponse = await fetch(`${pixabayApiUrl}key=${process.env.PIXA_KEY}&q=${req.body.city}&image_type=photo`)
        const pixaJsonData = await pixaApiResponse.json();
        responsePackage.push(pixaJsonData)

        res.send(responsePackage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
