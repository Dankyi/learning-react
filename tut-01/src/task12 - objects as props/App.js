import Navbar from "./component/Navbar";
import Gallery from "./component/Gallery";
import Vegetable from "./component/Vegetable";
import vegData from "./vegetable-data";

function App() {
    const veggies = vegData.map(veg => {
        return (
            // i.e. call the Vegetable function/Class rendering each veg property.
            // NB: For data with few properties selecting all the properties one by one is  
            // okay but if there are a lot of properties its best passing the entire object 
            // to the function as shown below which achieves same results as before
            <Vegetable
                id={veg.id}
                item={veg}
                // description={veg.description}
                // price={veg.price}
                // picture={veg.picture}
                // stats={veg.stats}
                // color={veg.color}
                // location={veg.location}
                // inStock={veg.instock}
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
