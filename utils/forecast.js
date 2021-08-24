const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=46d12f6c359d43abc69b8c73460f1e14&query=${long},${lat}&units=m`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Error! Unable to connect the weather service.', undefined);
        } else if (response.body.error) {
            const body = response.body;
            callback(`Error ${body.error.code}! ${body.error.info}`, undefined);
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees.`);
        }
    });
}

module.exports = forecast;