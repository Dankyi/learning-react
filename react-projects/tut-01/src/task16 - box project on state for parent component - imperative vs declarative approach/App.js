import React from "react";
import boxData from "./box-data";
import Box from "./Box";

export default function App() {
    const [boxes, setBoxes] = React.useState(boxData);

    function toggleColor(id) {
        // // IMPERATIVE APPROACH
        // setBoxes((prevBoxes) => { // prevBoxes = all elements in the box data
        //     const newBoxArray = [];
        //     for (let i = 0; i < prevBoxes.length; i++) {
        //         const currBox = prevBoxes[i];
        //         if (currBox.id === id) {
        //             const updatedBox = {
        //                 ...currBox, // Get all of its properties
        //                 on: !currBox.on // Flip its "on" property
        //             };
        //             newBoxArray.push(updatedBox); // Push to the array
        //         } else {
        //             newBoxArray.push(currBox);
        //         }
        //     }
        //     return newBoxArray;
        // });


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
                id={boxItem.id}
                on={boxItem.on}
                toggle={toggleColor}
            />
        );
    });

    return (
        <main>
            {boxItems}
        </main>
    );
}