import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Single = () => {
  const { type, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItem(data.result.properties);
      })
      .catch((error) => console.log(error));
  }, [type, id]);

  if (!item) {
  return (
    <div className="loading-container">

      <div className="starwars-spinner"></div>

      <h2 className="loading-text">
        Loading data from the galaxy...
      </h2>

    </div>
  );
}

  const getDetails = () => {
    if (type === "people") {
      return [
        { label: "Name", value: item.name },
        { label: "Gender", value: item.gender },
        { label: "Height", value: item.height },
        { label: "Skin Color", value: item.skin_color },
        { label: "Eye Color", value: item.eye_color },
      ];
    }

    if (type === "planets") {
      return [
        { label: "Name", value: item.name },
        { label: "Climate", value: item.climate },
        { label: "Population", value: item.population },
        { label: "Terrain", value: item.terrain },
        { label: "Diameter", value: item.diameter },
      ];
    }

    if (type === "vehicles") {
      return [
        { label: "Name", value: item.name },
        { label: "Model", value: item.model },
        { label: "Manufacturer", value: item.manufacturer },
        { label: "Crew", value: item.crew },
        { label: "Passengers", value: item.passengers },
      ];
    }

    return [];
  };

  return (
    <div className="container text-center mt-5">

      <div className="row align-items-center">

        <div className="col-md-6">
          <img
            src="https://placehold.co/800x600"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h1>{item.name}</h1>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>

      </div>

      <hr className="text-danger my-4" />

      <div className="row text-danger">

        {
          getDetails().map((detail, index) => {
            return (
              <div className="col" key={index}>

                <strong>{detail.label}</strong>

                <p>{detail.value}</p>

              </div>
            );
          })
        }

      </div>

      <Link to="/">
        <button className="btn neon-blue-btn mt-4">
          ← Back home
        </button>
      </Link>

    </div>
  );
};