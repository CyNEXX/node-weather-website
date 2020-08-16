/*window.onload = function () {}*/

console.log('Client Side JavaScript file');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const updateWeather = (data) => {
    messageOne.textContent = data.address.location;
    messageTwo.textContent = data.forecastData.longDescription;
}

const updateError = (errData) => {
    messageOne.textContent = errData;
    messageTwo.textContent = '';
}

const updateContent = (type, ...data) => {
    switch (type) {
        case 'info': {
            messageOne.textContent = data;
            messageTwo.textContent = '';
            break;
        }
        case 'error': {
            messageOne.textContent = data;
            messageTwo.textContent = '';
            break;
        }
        case 'weather': {
            messageOne.textContent = data[0].address.location;
            messageTwo.textContent = data[0].forecastData.longDescription;
            break;
        }
        default: return console.log('Default');
    }
}

const getWeather = location => {
    console.log('Loading');
    fetch('http://127.0.0.1:3000/weather?address=' + location).then(response => response.json().then(data => {
        if (data.error) {
            updateContent('error', data.error);
            return console.log(data.error);
        }
        updateContent('weather', data);
    })).catch(e => { console.log('the catch'); updateContent('error', e.error); console.log(e); });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const locationVariable = search.value
    getWeather(locationVariable);
});
