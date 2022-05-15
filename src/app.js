const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const res = require('express/lib/response')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')//by default hbs's default location for views folder is inside src //'app.set'(is used to Assigns setting name to value. ) to tell express which templeting engine we are using. templating is used to serve dynamic pages.hbs is express template engine for handlebars
app.set('views', viewsPath) // to change the name and location of folder from src to outside src
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anshul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anshul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anshul'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        throw 'Please provide address'
    }

    geocode(req.query.address, (error, { Latitude, Longitude, Place } = {}) => {
        if(error){
            return res.send({error})
        }
        // console.log(response);
        forecast(Latitude, Longitude,(error, forecastData) => {
            if(error) {
               return res.send({error})
            }
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location: Place,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Anshul'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Anshul'
    })
})

app.listen(3000, () => {
    console.log(`Server is up at port 3000`);
})