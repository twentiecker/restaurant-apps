export function getAllResto() {
  return fetch("data/DATA.json")
    .then((response) => response.json())
    .then((data) => data.restaurants);
}
