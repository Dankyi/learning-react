import logogrid from "../images/airbnb-grid.png";

function Hero() {
    return (
        <section className="hero-section">
            <img className="hero-img" src={logogrid}></img>
            <h1 className="hero-h1">Online Experiences</h1>
            <p className="hero-p">
                Join unique interactive activities led by
                one-of-a-kind hosts-all without leaving home
            </p>
        </section>
    );
}

export default Hero;