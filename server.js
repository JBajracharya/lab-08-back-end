'use strict';
//DEPENDENCIES
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
const app = express();
app.use(cors());

// GLOBAL VARIABLES
let error = {
  status: 500,
  responseText: 'Sorry, something went wrong',
}
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.DARKSKY_API_KEY;
const EVENTBRITE_API_KEY = process.env.EVENT_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
let locationSubmitted;

const client = new pg.Client(`${DATABASE_URL}`);
client.on('error', error => console.log(error));
client.connect();

// LOCATION PATH
app.get('/location', checkDatabase(request, response));

// LOCATION CONSTRUCTOR FUNCTION
function Geolocation(searchquery, formAddr, lat, lng) {
  this.searchquery = searchquery;
  this.formatted_query = formAddr;
  this.latitude = lat;
  this.longitude = lng;
}

// WEATHER PATH
app.get('/weather', (request, response) => {
  superagent.get(`https://api.darksky.net/forecast/${WEATHER_API_KEY}/${locationSubmitted.latitude},${locationSubmitted.longitude}`).then(res => {
    const weatherArr = res.body.daily.data
    const reply = weatherArr.map(byDay => {
      return new Forecast(byDay.summary, byDay.time);
    })
    response.send(reply);
  })
})
// FORECAST CONSTRUCTOR FUNCTION
function Forecast(summary, time) {
  this.forecast = summary;
  this.time = (new Date(time * 1000)).toDateString();
}
app.get('/events', (request, response) => {
  superagent.get(`http://api.eventful.com/json/events/search?where=${locationSubmitted.latitude},${locationSubmitted.longitude}&within=25&app_key=${EVENTBRITE_API_KEY}`).then(res => {
    let events = JSON.parse(res.text);
    let moreEvents = events.events.event
    let eventData = moreEvents.map(event => {
      return new Event(event.url, event.title, event.start_time, event.description)
    })
    response.send(eventData);
  }).catch( function () {
    console.log('banana');
    return null;
  })
})

function Event(link, name, event_date, summary='none') {
  this.link = link,
  this.name = name,
  this.event_date = event_date,
  this.summary = summary
}


//     const SQL = 'SELECT * FROM people;';
//     client.query(SQL).then(sqlResponse => {
//       console.log(sqlResponse);
//       res.send(sqlResponse.rows);
//     });
// when the user enters the query I want user to check to database to see if the queried info is there already
function checkDatabase(request, response) {
    let query = request.query.data;
    const sql = 'SELECT * FROM cityLocation;';
    client.query(sql).then(sqlResponse => {

    sqlResponse.rows.forEach(location => {
        if(location.searchquery === query){
            // callfromDatabase(request, response);
            locationSubmitted = new Geolocation(location.searchquery, location.formattedQuery, location.latitude, location.longitude);
            respond.send(locationSubmitted);
          } else {
            createDataFromAPI(request, response);
        }
    });
        
    });
} 


function createDataFromAPI(request, response) {
    // let query = request.query.data;
    superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_API_KEY}`).then(response => {
      const location = response.body.results[0].geometry.location;
      const formAddr = response.body.results[0].formatted_address;
      const searchquery = response.body.results[0].address_components[0].long_name.toLowerCase();
      if (query !== searchquery) {
        response.send(error);
        console.log(error);
        return null;
      }
      locationSubmitted = new Geolocation(searchquery, formAddr, location.lat, location.lng);
      
      res.send(locationSubmitted);
    })
  
  };




app.listen(PORT, () => {
  console.log(`App is on PORT: ${PORT}`);
});