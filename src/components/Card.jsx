import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import charactersImg from "../assets/img/characters.jpg";
import planetsImg from "../assets/img/planets.jpg";
import vehiclesImg from "../assets/img/vehicles.jpg";

export const Card = (props) => {

    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const getImage = () => {
        if (props.type === "people") {
            return charactersImg;
        }

        if (props.type === "planets") {
            return planetsImg;
        }

        if (props.type === "vehicles") {
            return vehiclesImg;
        }
        };

    return (
        <div
            className="card star-card"
        >

            <img
                src={getImage()}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column justify-content-between">

                <div>
                    <h5>{props.name}</h5>

                    <p className="card-text">
                        UID: {props.uid}
                    </p>
                </div>

                <div className="d-flex justify-content-between mt-3">

                    <button
                      className="btn neon-blue-btn"
                      onClick={() => {
                        sessionStorage.setItem("homeScrollY", window.scrollY);
                        navigate(`/details/${props.type}/${props.uid}`);
                      }}
                    >
                      Learn more!
                    </button>

                    <button
                        className="btn favorite-btn"
                        onClick={() =>
                            dispatch({
                                type: "add_favorite",
                                payload: {
                                    name: props.name,
                                    uid: props.uid,
                                    type: props.type
                                }
                            })
                        }
                    >
                         ♡
                    </button>

                </div>

            </div>

        </div>
    );
};