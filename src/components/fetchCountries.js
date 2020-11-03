
export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then((data) => data.json())
    .then((array)=>array)
}