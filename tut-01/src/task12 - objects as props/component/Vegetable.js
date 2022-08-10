import star from "../images/star.png";

function Vegetable(props) {
    let badgeText;
    // Just !props.inStock can also be used
    if (props.item.instock === 0) {
        badgeText = "SOLD OUT";
    } else if (props.item.location === "Online") {
        badgeText = "ONLINE";
    }
    
    return (
        <div className="veg">
            {/* !props.inStock can also be used in place of "props.inStock === 0" */}
            {/* { props.inStock === 0 && <div className="veg-badge">SOLD OUT</div> } */}
            { badgeText && <div className="veg-badge">{badgeText}</div> }
            <img className="veg-pic" src={props.item.picture}></img>

            <div className="veg-stats">
                <img className="veg-star" src={star}></img>
                <span>{props.item.stats.rating}</span>
                <span className="gray">({props.item.stats.reviews} reviews) • </span>
                <span className="gray">{props.item.location}</span>
            </div>

            <p className="veg-descr">{props.item.description}</p>
            <p className="bold">
                <span>Price: £{props.item.price}</span>
            </p>
        </div>
    );
}

export default Vegetable;
