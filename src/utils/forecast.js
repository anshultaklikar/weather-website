const request = require('postman-request')

const forecast = ((lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca3a101d142b68f25b783ed4325dcd75&query=' + lat +',' + long;
    request({url, json: true}, (error, { body }) => { // Destructuring instead of uising response we will directly use items in response {body: bdhskf}
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions + ', Temperature: ' + body.current.temperature + ' degrees')
        }
    })
})

module.exports = forecast