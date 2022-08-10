import Contact from "./component/Contact";
import dp1 from "./images/dp1.jpg";
import dp2 from "./images/dp2.jpg";
import dp3 from "./images/dp3.jpg";
import dp4 from "./images/dp4.jpg";

function App() {
    return (
        <div className="contacts">
            <Contact
                // These are referred as props - properties
                img={dp1}
                name="Leticia"
                phone="051887463"
                email="leticia@example.com"
            />

            <Contact
                img={dp2}
                name="Rachel"
                phone="051887463"
                email="rachel@example.com"
            />

            <Contact
                img={dp3}
                name="Eben1"
                phone="051887463"
                email="eben1@example.com"
            />

            <Contact
                img={dp4}
                name="Eben2"
                phone="051887463"
                email="eben2@example.com"
            />            
        </div>
    );
}

export default App;
