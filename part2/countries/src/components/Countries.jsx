import Country from "./Country"

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    )
  }

  return (
    <div>
      {countries.map(country =>
        <div key={country.name.common}>{country.name.common}</div>
      )}
    </div>
  )
}

export default Countries