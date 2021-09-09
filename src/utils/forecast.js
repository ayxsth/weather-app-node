const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=46d12f6c359d43abc69b8c73460f1e14&query=${long},${lat}&units=m`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Unable to connect the weather service.', undefined);
        } else if (body.error) {
            callback(`Error ${body.error.code}! ${body.error.info}`, undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%.`);
        }
    });
}

module.exports = forecast;