import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [loading, setLoading] = useState(true)
  const [toShow, setToShow] = useState("")
  const [weather, setWeather] = useState([])
  let content = ""

  useEffect(() => {
    console.log("country fetch render...");
    axios.get("https://countriesnow.space/api/v0.1/countries")
      .then(response => {
        setCountries(response.data.data)
        setLoading(false)
      })
  }, [])

  const onSearchChangeHandler = (event) => {
    setCountriesToShow(countries.filter(country => country.country.match(new RegExp(event.target.value, "i"))))
  }

  const showCountryClickHandler = (event, country) => {
    console.log(country);
    setCountriesToShow([country])
  }

  const fetchWeather = (country) => {
    console.log(country);
    console.log(api_key);
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
      .then(response => {
        console.log("weather response: ", response.data);
        setWeather(response.data.current)
      })
  }

  useEffect(() => {
    console.log("countries to show update render...");
    console.log(countriesToShow.length)
    if (countriesToShow.length === 1) {
      fetchWeather(countriesToShow[0].country)
    } else if (countriesToShow.length <= 10) {
      setToShow(
        <ul>
          {countriesToShow.map(country =>
            <li key={country.country}>
              {country.country}
              <button onClick={(e) => showCountryClickHandler(e, country)}>show</button>
            </li>)}
        </ul>)
    } else if (countriesToShow.length > 10) {
      setToShow("Too many matches, be more specific")
    }
  }, [countriesToShow])

  useEffect(() => {
    console.log("weather update render...");
    if (countriesToShow.length === 1) {
      console.log(weather);
      setToShow(
        <div>
          <h1>{countriesToShow[0].country}</h1>
          <h2>Cities</h2>
          <ul>
            {countriesToShow[0].cities.map(city => <li key={city}>{city}</li>)}
          </ul>
          <h2>Weather</h2>
          <p>temperature: {weather.temperature}</p>
          <img src={weather.weather_icons} alt="weather_icon"/>
          <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
      )
    }
  }, [weather, countriesToShow])

  if (loading) {
    content = <h1>Fetching Data...</h1>
  } else {
    content = (
      <div>
        <div>find countries: <input onChange={(e) => onSearchChangeHandler(e)} /></div>
        {toShow}
      </div>
    )
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
