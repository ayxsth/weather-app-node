const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');     //optional if set as default folder name (views)
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);    //optional if set as default folder name (views)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aayush Shrestha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aayush Shrestha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Contact ayxsth@gmail.com for help.',
        name: 'Aayush Shrestha'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter the address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        msg: '404 Error! Help article not found.',
        name: 'Aayush Shrestha'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        msg: '404 Error! Page not found.',
        name: 'Aayush Shrestha'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});