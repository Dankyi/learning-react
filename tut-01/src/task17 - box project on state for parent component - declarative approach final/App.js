import React from "react";
import boxData from "./box-data";
import Box from "./Box";

export default function App() {
    const [boxes, setBoxes] = React.useState(boxData);

    function toggleColor(id) {
        // DECLARATIVE APPROACH
        setBoxes(prevBoxes => {
            // Map each prev box and for the one that matches the id, select
            // all of its prev properties/state and then flip its "on" state 
            // else if it doesn't match the id leave it unchanged/as it is.  
            return prevBoxes.map((prevBox) => {
                return prevBox.id === id ? {...prevBox, on: !prevBox.on} : prevBox;
            });
        });
    }

    const boxItems = boxes.map(boxItem => {
        return (
            <Box 
                key={boxItem.id}
                on={boxItem.on}
                // In order to call a function that demands a parameter
                // make use of an anonymous function i.e. "() =>"
                toggle={() => toggleColor(boxItem.id)}
            />
        );
    });

    return (
        <main>
            {boxItems}
        </main>
    );
}