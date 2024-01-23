const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

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

app.post('/api/sentiment', async (req, res) => {
    const apiUrl = 'https://api.meaningcloud.com/sentiment-2.1';
    const formdata = new FormData();
    formdata.append('key', process.env.API_KEY);
    formdata.append('txt', req.body.text);
    formdata.append('lang', 'en');

    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            body: formdata,
        });
        const apiJson = await apiResponse.json();
        res.send(apiJson);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
