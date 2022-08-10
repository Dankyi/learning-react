import dp from "./eben.jpg";
function Main() {
    return (
        <main>
            <div>
                <img className="main-img" src={dp}></img>
            </div>

            <div>
                <h2>Eben Boateng</h2>
                <h3>Frontend Developer</h3>
                <h4>dfligh15@yahoo.com</h4>
            </div>

            <div>
                <button>Email</button>
                <button>LinkedIn</button>
            </div>

            <div>
                <div>
                    <h2>About</h2>
                    <p>I am a cool guy</p>
                </div>
                <div>
                    <h2>Interests</h2>
                    <p>I love football</p>
                </div>
            </div>
        </main>
    );
}

export default Main;