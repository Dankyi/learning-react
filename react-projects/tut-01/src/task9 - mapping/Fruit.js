function Fruit(props) {
    const { name, taste } = props;

    return (
        <div>
            {/* <h3>Fruit: {props.name}</h3>
            <h3>Taste: {props.taste}</h3> */}

            {/* The above or object destruction approach*/}
            <h3>Fruit: {name}</h3>
            <h3>Taste: {taste}</h3>
        </div>
    );   
}

export default Fruit;