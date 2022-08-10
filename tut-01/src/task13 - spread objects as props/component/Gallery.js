import veggies from "../images/veggies.png";

function Gallery() {
    return (
        <section className="gallery-section">
            <img className="gallery-img" src={veggies}></img>
            <h1 className="gallery-h1">Online Experiences</h1>
            <p className="gallery-p">
                Join unique interactive activities led by one-of-a-kind
                hosts-all without leaving home
            </p>
        </section>
    );
}

export default Gallery;
