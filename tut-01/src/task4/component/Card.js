import katie from "../images/katie.jpg";
import star from "../images/star.png";

function Card() {
    return (
        <div className="card">
            <img className="card-katie" src={katie}></img>

            <div className="card-stats">
                <img className="card-star" src={star}></img>
                <span>5.0</span>
                <span className="gray">(6) • </span>
                <span className="gray">USA</span>
            </div>

            <p>Life lessons with Katie</p>
            <p>
                <span className="bold">From $136</span> per person
            </p>
        </div>
    );
}

export default Card;
