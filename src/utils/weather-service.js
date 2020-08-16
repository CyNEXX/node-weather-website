const request = require('request');
const auth = require('./auth');
const geoCode = require('./geocode');
const forecast = require('./forecast');

const authKeys = auth.get();

const weatherPromise = function (searchText) {
    let model = {};
    return new Promise((resolve, reject) => {
        resolve(geoCode(searchText, authKeys));
    }).then((geoCodeData) => {
        model.location = geoCodeData;
        return forecast(geoCodeData, authKeys)
    }).then((forecastData) => {
        model.forecast = forecastData;
        model.longTitle = (forecastData.day === 'yes' ? 'A day ' : forecastData.day === 'no' ? 'A night ' : 'Twilight zone ') + 'in ' + model.location.location;
        model.longDescription = forecastData.description +
            '. It is currently ' + forecastData.temperature +
            ' degress out. It fells like ' + forecastData.feeling +
            ' degress out. There is a ' + forecastData.rainChance +
            '% chance to rain. The umidity is ' + forecastData.humidity + '%.'
        /*console.log('Final model', model); */
        return model;
    }).catch(e => {
        model = {
            error: e
        };
        throw model;
    });
}


module.exports = weatherPromise;