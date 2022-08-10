function Contact(props) {
    const img = props.img;
    const name = props.name;
    const phone_num = props.phone;
    const email = props.email;

    return (
        <div className="contact-card">
            <img className="contact-dp" src={img}></img>
            <h3>{name}</h3>
            <div className="info-group">
                {/* <img src={}></img> */}
                <p>{phone_num}</p>
            </div>
            <div className="info-group">
                {/* <img src={}></img> */}
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Contact;
