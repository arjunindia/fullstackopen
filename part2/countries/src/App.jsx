import { useState, useEffect } from "react";
import axios from "axios";

const CountryView = ({ country }) => {
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  useEffect(() => {
    console.log(country.latlng);
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current=temperature_2m,wind_speed_10m`,
      )
      .then((res) => {
        setTemperature(
          `${res.data.current.temperature_2m}${res.data.current_units.temperature_2m}`,
        );
        setWind(
          `${res.data.current.wind_speed_10m}${res.data.current_units.wind_speed_10m}`,
        );
      });
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        {" "}
        Capital: <span>{country.capital.join(",")}</span>
      </p>
      <p>
        Area: <span>{country.area}</span>
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature: {temperature}</p>
      <p>Wind: {wind}</p>
    </div>
  );
};

const ListItem = ({ country }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <p>
        {country.name.common} {"  "}
        <button onClick={() => setToggle((t) => !t)}>
          {toggle ? "Hide" : "Show"}
        </button>
      </p>
      {toggle ? <CountryView country={country} /> : <></>}
    </div>
  );
};
const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (countries.length !== 1)
    return countries.map((country) => (
      <ListItem country={country} key={country.ccn3} />
    ));
  if (countries.length === 1) return <CountryView country={countries[0]} />;
};
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);
  return (
    <div>
      <div>
        find countries{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
