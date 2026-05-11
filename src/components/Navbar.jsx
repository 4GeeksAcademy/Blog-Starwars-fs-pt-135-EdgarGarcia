import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const allItems = [
    ...store.people.map((item) => ({ ...item, type: "people" })),
    ...store.planets.map((item) => ({ ...item, type: "planets" })),
    ...store.vehicles.map((item) => ({ ...item, type: "vehicles" })),
  ];

  const searchResults = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <nav className="navbar navbar-dark star-navbar sticky-top">
      <div className="container">

        <Link to="/" className="text-decoration-none">
          <span className="navbar-brand mb-0 h1 d-flex align-items-center gap-2 text-light">
            <i className="fa-brands fa-galactic-republic text-danger"></i>
            Star Wars Blog
          </span>
        </Link>

        <div className="d-flex align-items-center gap-3">

          <div className="search-wrapper">
            <input
              type="text"
              className="star-search-input"
              placeholder="Search the galaxy..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />

            {searchValue.trim() !== "" && (
              <div className="search-results">
                {searchResults.length === 0 ? (
                  <div className="search-result-item no-results-text">
                    No results found
                  </div>
                ) : (
                  searchResults.slice(0, 6).map((item) => {
                    return (
                      <div
                        key={`${item.type}-${item.uid}`}
                        className="search-result-item"
                        onClick={() => {
                          setSearchValue("");
                          navigate(`/details/${item.type}/${item.uid}`);
                        }}
                      >
                        {item.name}

                        <span className="search-result-type">
                          {item.type}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="dropdown">
            <button
              className="btn neon-red-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites

              <span className="ms-2 badge bg-dark">
                {store.favorites.length}
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              {store.favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item no-results-text">
                    No favorites yet
                  </span>
                </li>
              ) : (
                store.favorites.map((favorite, index) => {
                  return (
                    <li key={index}>
                      <span className="dropdown-item d-flex justify-content-between align-items-center">

                        <Link
                          to={`/details/${favorite.type}/${favorite.uid}`}
                          className="text-decoration-none text-light"
                        >
                          {favorite.name}
                        </Link>

                        <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={(event) => {
                            event.stopPropagation();

                            dispatch({
                              type: "remove_favorite",
                              payload: favorite.uid,
                            });
                          }}
                        >
                          🗑️
                        </button>

                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

        </div>

      </div>
    </nav>
  );
};