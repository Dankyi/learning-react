import React from "react";

function Box(props) {
    // Keep track of the current status of the box items passed as prop
    const [on, setOn] = React.useState(props.on);

    // document.getElementById("title").style.backgroundColor = "black";
    // Applying dynamic styles check code above for reference
    const styles = {
        backgroundColor: on ? "black" : "white"
    };

    function toggleBgColor() {
        // return on ? setOn(false) : setOn(true);
        // Either above or
        setOn(prevState => !prevState);
    }

    return (
        <div onClick={toggleBgColor} style={styles} className="box"></div>
    );
}

export default Box;