import star from "../images/star.png";

function Vegetable(props) {
    let badgeText;
    // Just !props.inStock can also be used
    if (props.instock === 0) {
        badgeText = "SOLD OUT";
    } else if (props.location === "Online") {
        badgeText = "ONLINE";
    }
    
    return (
        <div className="veg">
            { badgeText && <div className="veg-badge">{badgeText}</div> }
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
