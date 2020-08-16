const path = require('path');
const express = require('express');
const hbs = require('hbs');

const auth = require('./utils/auth');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths Express config
const port = 3000;
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handleBars and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));


// Load local authentication tokens
try {
    const authOptions = auth.get('auth');
} catch (e) {
    return console.log(e);
}

app.get(['', '/index'], (req, res) => {
    let model = {};
    model.title = 'Weather';
    model.name = 'CyNEXX';
    res.render('index', { model });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) { return res.send({ error: 'You must provide a search term' }); }
    const searchString = req.query.address;
    let model = {};
    geoCode(searchString, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            console.log('error', error);
            model.error = error; return res.send(model);
        }
        model.title = 'Weather';
        model.name = 'CyNEXX';
        model.address = {
            longitude, latitude, location,
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log('error', error);
                model.error = error; return res.send(model);
            }
            model.forecastData = forecastData;
            res.send(model);
        }, authOptions);
    }, authOptions);

});




app.get('/help', (req, res) => {
    res.render('help', {
        model: {
            helpText: 'Helpful text',
            title: 'Help page',
            name: 'CyNEXX'
        }

    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        model: {
            title: 'About me',
            name: 'CyNEXX'
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        model: {
            title: 'Error',
            name: 'CyNEXX',
            errorMessage: 'Help article not found'
        }

    });
});

app.get('*', (req, res) => {
    res.render('error', {
        model: {
            title: 'Error',
            name: 'CyNEXX',
            errorMessage: 'Page not found'
        }

    });
});




app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});