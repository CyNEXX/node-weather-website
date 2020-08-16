const fs = require('fs');
const path = require('path');
const e = require('express');
const DEFAULT_FILE_NAME = 'auth';

const auth = {
    REQUIRED_KEYS: ['weatherstack', 'mapbox'],
    get(fileName = DEFAULT_FILE_NAME) {
        let dataJSON = {};
        try {
            let dataPath = path.join(__dirname, fileName + '.json');
            let dataBuff = fs.readFileSync(dataPath, JSON.stringify());
            dataJSON = JSON.parse(dataBuff);
        } catch (e) {
            throw 'Could not read ' + fileName + '.json file';
        }
        try {
            if (Object.keys(dataJSON).length === 0) {
                throw ' any of the ';
            }
            if ((this.REQUIRED_KEYS.some((required_key) => {
                return Object.keys(dataJSON).indexOf(required_key) === -1;
            })) === true) {
                throw ' some of the ';
            }
        } catch (e) {
            throw 'Could not find' + e + 'needed keys in the file ' + fileName + '.json';
        }
        return dataJSON;
    }
}

module.exports = auth;