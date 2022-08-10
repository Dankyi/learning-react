import React from "react";

export default function App() {
    const [ formData, setFormData ] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        wantNewsletter: false
    });
    
    function handleChange(event) {
        setFormData(prevFormData => {
            // You can check the event.target properties under "inspect" in 
            // a browser. Console log the form data above the function first
            const { name, value, type, checked } = event.target;

            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);

        // // Approach 1
        // if (formData.wantNewsletter) {
        //     if (formData.password === formData.confirmPassword) {
        //         console.log("Thanks for signing up for our newsletter!");
        //         console.log("Successfully signed up!");
        //     } else {
        //         console.log("Passwords do not match!");
        //     }    
        // }

        // Approach 2
        if (formData.password === formData.confirmPassword) {
            console.log("Successfully signed up!");
        } else {
            console.log("Passwords do not match!");
            return; // This makes it not execute any further code below it
        }    

        if (formData.wantNewsletter) {
            console.log("Thanks for signing up for our newsletter!");
        }
    }
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                />
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                />
                
                <div className="form-marketing">
                    <input
                        id="okayToEmail"
                        type="checkbox"
                        name="wantNewsletter"
                        onChange={handleChange}
                        checked={formData.wantNewsletter}
                    />
                    <label htmlFor="okayToEmail">I want to join the newsletter</label>
                </div>

                <button className="form-submit">Sign up</button>
            </form>
        </div>
    );
}