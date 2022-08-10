export default function Die(props) {
    return (
        // 2 classNames for styling the die div based on if its held
        <div 
            onClick={props.holdDie} 
            className={`each-die-div ${props.isHeld ? "die-held" : ""}`}>
            
            <h2 className="each-die-h2">{props.value}</h2>
        </div>
    );
}