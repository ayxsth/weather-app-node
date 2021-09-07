const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2FkaWo3MzkwMCIsImEiOiJja3NuYnJrajEwYnJiMnhvNmtyZDVuOTZ0In0.5OXByQNNAV_wJT3JZbOggw&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Unable to connect the geo service.', undefined);
        } else if (body.features.length <= 0) {
            callback('Error! Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;