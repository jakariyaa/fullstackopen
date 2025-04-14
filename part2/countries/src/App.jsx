import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => { setCountries(response.data) })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShowClick = (name) => {
    setQuery(name)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      <div>
        <Countries countries={countriesToShow} handleShowClick={handleShowClick} />
      </div>
    </div>
  )
}

export default App