import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { Card } from "../components/Card";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

  console.log(store.people);

  useEffect(() => {
  fetch("https://www.swapi.tech/api/people")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      dispatch({
        type: "set_people",
        payload: data.results
      });
    })
    .catch((error) => console.log(error));

	fetch("https://www.swapi.tech/api/planets")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    dispatch({
      type: "set_planets",
      payload: data.results
    });
  })
  .catch((error) => console.log(error));

  fetch("https://www.swapi.tech/api/vehicles")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    dispatch({
      type: "set_vehicles",
      payload: data.results
    });
  })
  .catch((error) => console.log(error));

}, []);

useEffect(() => {
  if (
    store.people.length > 0 &&
    store.planets.length > 0 &&
    store.vehicles.length > 0
  ) {
    const savedScroll = sessionStorage.getItem("homeScrollY");

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedScroll));
        sessionStorage.removeItem("homeScrollY");
      }, 100);
    }
  }
}, [store.people, store.planets, store.vehicles]);

const isLoading =
  store.people.length === 0 ||
  store.planets.length === 0 ||
  store.vehicles.length === 0;

if (isLoading) {
  return (
    <div className="loading-container">
      <div className="starwars-spinner"></div>

      <h2 className="loading-text">
        Loading data from the galaxy...
      </h2>
    </div>
  );
}

	return (
  <div className="container">

    <div className="section-header">
      <h1 className="section-title">Characters</h1>
    </div>

    <div className="d-flex gap-3 overflow-auto py-3 px-2">
      {
        store.people.map((person) => {
          return (
            <Card
              key={person.uid}
              name={person.name}
              type="people"
              uid={person.uid}
            />
          );
        })
      }
    </div>

    <div className="section-header">
      <h1 className="section-title">Planets</h1>
    </div>

    <div className="d-flex gap-3 overflow-auto py-3 px-2">
      {
        store.planets.map((planet) => {
          return (
            <Card
              key={planet.uid}
              name={planet.name}
              type="planets"
              uid={planet.uid}
            />
          );
        })
      }
    </div>

    <div className="section-header">
      <h1 className="section-title">Vehicles</h1>
    </div>

<div className="d-flex gap-3 overflow-auto py-3 px-2">
  {
    store.vehicles.map((vehicle) => {
      return (
        <Card
          key={vehicle.uid}
          name={vehicle.name}
          type="vehicles"
          uid={vehicle.uid}
        />
      );
    })
  }
</div>

  </div>
);}