import React from "react"

export default function Joke(props) {
    const [isShown, setIsShown] = React.useState(false);

    function togglePunchline() {
        // return isShown ? setIsShown(true) : isShown;
        setIsShown(prevStatus => !prevStatus);
    }

    return (
        <div>
            {props.setup && <h3>{props.setup}</h3>}
            {/* 0(false) && 1(true) => 0    1 && 1 => 1 */}
            {isShown && <p>{props.punchline}</p>}
            <button onClick={togglePunchline}>{isShown ? "Hide" : "Show"} Punchline</button>
            <hr />
        </div>
    );
}