import React from "react";

export default function Form() {
    // NB: THIS IS NOT AN IDEAL WAY TO DO IT AS IT CAN CLEARLY BE SEEN THAT THERE
    // ARE LOTS OF CODE DUPLICATION SO WE UTILIZE CLASS INSTEAD. SEE NEXT TASK
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    function handleFirstNameChange(event) {
        // console.log(event.target.id);
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        // console.log(event.target.id);
        setLastName(event.target.value);
    }

    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleFirstNameChange}
            />

            <input
                type="text"
                placeholder="Last Name"
                onChange={handleLastNameChange}
            />
        </form>
    )
}
