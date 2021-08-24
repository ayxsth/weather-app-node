const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (!process.argv[2])
    return console.log('Please enter a location.');

geocode(process.argv[2], (error, geoData) => {
    if (error) {
        return console.log(error);
    }
    forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error);
        }
        console.log('Location:', geoData.location);
        console.log(forecastData);
    });
});
