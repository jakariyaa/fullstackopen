import Country from "./Country"

const Countries = ({ countries, handleShowClick }) => {
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
        <div key={country.name.common}>{country.name.common} <button onClick={() =>
          handleShowClick(country.name.common)}>Show</button>
        </div>
      )}
    </div>
  )
}

export default Countries