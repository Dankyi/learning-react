import React from "react";

export default function Form() {
    const [formData, setFormData] = React.useState({
        firstname: "",
        lastname: "",
        email: ""
    });

    console.log(formData);

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                // Since we don't know the DOM element that triggered the event and don't
                // want to make use of countless if statements (especially if there
                // are many form elements) we make use of the name of the target and 
                // surround it with [] in order to make it acceptable as an object key
                [event.target.name]: event.target.value
            }
        });
    }

    return (
        <form>
            <input
                name="firstname"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
            />

            <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
            />
        </form>
    )
}
