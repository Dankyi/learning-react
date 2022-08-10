function Contact(props) {
    // Either declare it this way or replace "(props)" with
    // ({ img, name, phone, email })
    const { img, name, phone, email } = props;
    return (
        <div className="contact-card">
            <img className="contact-dp" src={img}></img>

            {/* Evaluates to 0 && 1 which => 0 or false thereby hiding "Name: " */}
            {/* Can also be achieved by: */}
            {/* <h3 style={{ display: name ? "block" : "none" }}>Name: {name}</h3> */}
            {name && <h3>Name: {name}</h3>}
            <div className="info-group">
                <p>Phone Number: {phone}</p>
            </div>
            <div className="info-group">
                <p>Email: {email}</p>
            </div>
        </div>
    );
}

export default Contact;
