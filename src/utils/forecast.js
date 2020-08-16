const request = require('request');



const forecast = (latitude, longitude, callback, { weatherstack }) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstack + '&query=' + latitude + ',' + longitude + '&units=m';
    //const url = 'http://api.weathack.com/current?access_key=' + weatherstack + '&query=' + latitude + ',' + longitude + '&units=m'; // -- test broken link
    request({
        url,
        json: true
    }, (error, { body } = {}) => {
        if (error) { callback('Unable to connect to the weather service.', {}); }
        else if (body.error) { callback('Unable to find the specified location.', {}); }
        else {

            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feeling: body.current.feelslike,
                rainChance: body.current.precip * 100,
                longDescription: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It fells like ' + body.current.feelslike + ' degress out. There is a ' + body.current.precip * 100 + '% chance to rain.'
            });
        }
    });
};

module.exports = forecast;
