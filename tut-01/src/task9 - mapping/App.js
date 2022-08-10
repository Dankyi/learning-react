import Fruit from "./Fruit";
import fruitsData from "./fruits-data";

function App() {
    const fruits = fruitsData.map((fruit) => {
        return <Fruit name={fruit.name} taste={fruit.taste} />;
    });

    // same as return fruits;
    return <div>{fruits}</div>;
}

export default App;
