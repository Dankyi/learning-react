import React from "react";

export default function Form() {
    const [formData, setFormData] = React.useState({
        firstname: "",
        lastname: "",
        email: "",
        comment: "",
        isFriendly: false,
        employment: "",
        favColor: ""
    });

    console.log(formData);

    function handleChange(event) {
        // Destructor or pull out name, value, type, checked properties
        // from event.target  object and make use of it directly in the code
        const { name, value, type, checked } = event.target;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                // Since we don't know the DOM element that triggered the event and don't
                // want to make use of countless if statements (especially if there
                // are many form elements) we make use of the name of the target and 
                // surround it with [] in order to make it acceptable as an object key
                [name]: type === "checkbox" ? checked : value // Introduced because checkbox is Boolean while the others are of the same type i.e. string hence "value"
            };
        });
    }

    // NB: There should be a single source of truth with states i.e.
    // the state of a component shouldn't be passed to other child
    // components but maintained only in the parent. To overcome this
    // in forms the, the current value of its state should be passed
    // as value in the html/DOM element as shown below: 

    return (
        <form>
            {/* Inputs example - String */}
            <input
                name="firstname"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstname} // Controlling the component here
            />

            <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastname} // Controlling the component here
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email} // Controlling the component here
            />




            {/* Textarea example - String*/}
            <textarea
                name="comment"
                type="txt"
                placeholder="Comment"
                onChange={handleChange}
                value={formData.comment} // Controlling the component here
            />




            {/* Checkbox example - Boolean */}
            <input
                name="isFriendly"
                type="checkbox"
                id="isFriendly"
                onChange={handleChange}
                checked={formData.isFriendly} // Controlling the component here
            />
            {/* This makes clicking of the label checks or unchecks the Checkbox */}
            <label htmlFor="isFriendly">Are you friendly?</label>
            <br />
            <br />
            <br />




            {/* Radio button example */}
            {/* NB: Giving them the same name makes one selectable at a time when clicked*/}
            <fieldset>
                <legend>Current employment status</legend>
                
                <input
                    name="employment"
                    type="radio"
                    id="unemployed"
                    value="unemployed"
                    onChange={handleChange}
                    checked={formData.employment === "unemployed"} // Controlling the component here
                />
                <label htmlFor="unemployed">Unemployed</label>
                <br />
                
                <input
                    name="employment"
                    type="radio"
                    id="part-time"
                    value="part-time"
                    onChange={handleChange}
                    checked={formData.employment === "part-time"} // Controlling the component here
                />
                <label htmlFor="part-time">Part-time</label>
                <br />
                
                <input
                    name="employment"
                    type="radio"
                    id="full-time"
                    value="full-time"
                    onChange={handleChange}
                    checked={formData.employment === "full-time"} // Controlling the component here
                />
                <label htmlFor="full-time">Full-time</label>
                <br />
            </fieldset>
            <br />
            <br />



            {/* Select & Option (Combobox) example */}
            <label htmlFor="favColor">What is your favorite color?</label>
            <br />
            <select
                name="favColor"
                id="favColor"
                value={formData.favColor}
                onChange={handleChange}   
            >
                <option value="">---Choose Color---</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="violet">Violet</option>
            </select>
        </form>
    )
}
