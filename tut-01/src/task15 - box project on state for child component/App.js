import React from "react";
import boxData from "./box-data";
import Box from "./Box";

export default function App() {
    const [boxes, setBoxes] = React.useState(boxData);

    const boxItems = boxes.map(boxItem => (
        <Box 
            key={boxItem.id}
            on={boxItem.on}
        />
    ));

    return (
        <main>
            {boxItems}
        </main>
    );
}