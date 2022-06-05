<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge

## About

This projet implemented sucessfuly all the mandatory features:

- Ability to add "reminders" (max. 30 characters) for a day and time specified by the user. Also, include a city.

- Ability to edit reminders - including changing text, city, day and time.

- Add a weather service call from MetaWeather, AccuWeather or VisualCrossing and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

Due to API limitions, the weather forecast will be only available for 5 days from the current date, from 3 to 3 hours. So if you wanna test the forecast functionality, select a date 5 days from here in a divisible by three (00:00, 03:00, 06:00...). Please also consider that the request limit for the free pricing of openweather api is 60 per minute, so that may affect testing as well.

## Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

Clone the project and access the folder and run

API KEY to be used = 7efc66c9b6f14033ca543b84772f27fc

```bash
# Install the dependencies
$ yarn install

# Create .env file based on sample
$ cp .env.sample .env

# Add the openweather api key on the REACT_APP_API_KEY .env
...

# Start the client
$ yarn start

# Acess the application in the browser
http://localhost:3000/calendar
```
