export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_people":
  return {
    ...store,
    people: action.payload
  };

  case "set_planets":
  return {
    ...store,
    planets: action.payload
  };

  case "add_favorite":

  const exists = store.favorites.some(
    (favorite) =>
      favorite.uid === action.payload.uid &&
      favorite.type === action.payload.type
  );

  if (exists) {
    return store;
  }

  return {
    ...store,
    favorites: [...store.favorites, action.payload]
  };
  return {
    ...store,
    favorites: [...store.favorites, action.payload]
  };

  case "remove_favorite":
  return {
    ...store,
    favorites: store.favorites.filter(
      (favorite) => favorite.uid !== action.payload
    )
  };

  case "set_vehicles":
    return {
      ...store,
      vehicles: action.payload
    };

    default:
      return store;
  }
}