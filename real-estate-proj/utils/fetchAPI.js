import axios from "axios";

export const baseURL = "https://bayut.p.rapidapi.com";

export const fetchAPI = async (url) => {
    // Destructure and get the data property immediately 
    // after getting the response from the api call
    const { data } = await axios.get(url, {
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });

    return data;
}