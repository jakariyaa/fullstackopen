import axios from "axios"
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?` +
    `q=${country.capital[0]}&` +
    `units=${'metric'}&` +
    `appid=${api_key ? api_key : 'b1b15e88fa797225412429c1c50c122a1'}` // Sample API key from OWM is used if env parsing fails

  useEffect(() => {
    axios.get(url).then(response => { setWeather(response.data) })
  }, [])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h1>Languages:</h1>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h1>Weather in {country.capital[0]}</h1>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`https://openweathermap.org/img/wn/${weather.weather[0].description}@2x.png`} />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Country