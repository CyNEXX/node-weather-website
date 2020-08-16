const path = require('path');
const express = require('express');
const hbs = require('hbs');



const app = express();
const port = process.env.PORT || 3000;

// Define paths Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handleBars and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));


// Load weather service
const weatherService = require('./utils/weather-service');


app.get(['', '/index'], (req, res) => {
    let model = {};
    model.title = 'Weather';
    model.longTitle = 'Weather';
    model.name = 'CyNEXX';
    res.render('index', { model });
});

app.get('/weather', (req, res) => {
    let model = {};
    return new Promise((resolve, reject) => {
        
        if (!req.query.address) { reject({ error: 'You must provide a search term' }); }
        const search = req.query.address;
        resolve(weatherService(search));
    }).then((model) => {
        res.send(model);
    }).catch(e => res.send(model.error = e));
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