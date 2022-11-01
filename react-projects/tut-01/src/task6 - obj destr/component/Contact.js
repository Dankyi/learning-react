function Contact(props) {
    // Either declare it this way or replace "(props)" with
    // ({ img, name, phone, email })
    const { img, name, phone, email } = props;
    return (
        <div className="contact-card">
            <img className="contact-dp" src={img}></img>
            <h3>Name: {name}</h3>
            <div className="info-group">
                <p>Number: {phone}</p>
            </div>
            <div className="info-group">
                <p>Email: {email}</p>
            </div>
        </div>
    );
}

export default Contact;
