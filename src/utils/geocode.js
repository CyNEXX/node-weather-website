const request = require('request');

const mapbox_retrieveLimit = 1;

const geoCode = (address, callback, { mapbox }) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapbox + '&limit=' + mapbox_retrieveLimit;
    //const url = 'https://api.ma' + encodeURIComponent(address) + '.json?access_token=' + mapbox + '&limit=' + mapbox_retrieveLimit; // -- test broken link
    request({
        url,
        json: true
    }, (error, { body } = {}) => {
        if (error) { callback('Unable to connect to location services', undefined) }
        else if (!body.features || !body.features.length) { callback('Unable to find the location. Try another search.', undefined) }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });

}


const geoCodeProm = function (address, { mapbox }) {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapbox + '&limit=' + mapbox_retrieveLimit;
       // const url = 'https://api.maoxasd.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapbox + '&limit=' + mapbox_retrieveLimit; // -- test broken link
        request({
            url,
            json: true
        }, (error, { body } = {}) => {
            if (error) { reject('Unable to connect to location services') }
            else if (!body.features || !body.features.length) { reject('Unable to find the location. Try another search.') }
            else {
                let geoCodeResult = {
                    longitude: body.features[0].center[0],
                    latitude: body.features[0].center[1],
                    location: body.features[0].place_name
                };
                //  console.log(geoCodeResult)
                resolve(geoCodeResult);
            }
        });
    }).catch(e => { throw e });
}
//module.exports = geoCode;
module.exports = geoCodeProm;



