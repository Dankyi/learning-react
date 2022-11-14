function App() {
    // React renders items in an array irrespective of their types
    // const fruits = ["pear", "apple", "lime"];
    const fruits = [<h3>pear</h3>, <h3>apple</h3>, <h3>lime</h3>];
    return (fruits);

    // The above is just like below:
    // return (
    //     <div>
    //         <h3>pear</h3>
    //         <h3>apple</h3>
    //         <h3>lime</h3>
    //     </div>
    // );
}

export default App;
