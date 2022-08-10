import Navbar from "./component/Navbar";
import Gallery from "./component/Gallery";
import Vegetable from "./component/Vegetable";
import vegData from "./vegetable-data";

function App() {
    const veggies = vegData.map(veg => {
        return (
            // i.e. call the Vegetable function/Class rendering each veg property.
            // NB: Task12 can be further simplified by spreading the properties of the object
            // (i.e. veg data) as shown below where "..." equals "properties" of the "veg"
            <Vegetable
                id={veg.id}
                {...veg}
            />
        );
    });

    return (
        <div>
            <Navbar />
            <Gallery />
            <section>
                {veggies}
            </section>
        </div>
    );
}

export default App;
