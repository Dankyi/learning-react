import React from "react";

function Box(props) {
    // document.getElementById("title").style.backgroundColor = "black";
    // Applying dynamic styles check code above for reference
    const styles = {
        backgroundColor: props.on ? "black" : "white"
    };

    return (
        <div 
            // Make use of anonymous function to call functions with a parameter
            onClick={props.toggle}
            style={styles} 
            className="box">
        </div>
    );
}

export default Box;