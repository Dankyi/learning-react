import star from "../images/star.png";

function Vegetable(props) {
    return (
        <div className="veg">
            <img className="veg-pic" src={props.picture}></img>

            <div className="veg-stats">
                <img className="veg-star" src={star}></img>
                <span>{props.stats.rating}</span>
                <span className="gray">({props.stats.reviews} reviews) • </span>
                <span className="gray">{props.location}</span>
            </div>

            <p className="veg-descr">{props.description}</p>
            <p className="bold">
                <span>Price: £{props.price}</span>
            </p>
        </div>
    );
}

export default Vegetable;
