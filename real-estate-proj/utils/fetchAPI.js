import axios from "axios";

export const baseURL = "https://bayut.p.rapidapi.com";

export const fetchAPI = async (url) => {
    // Destructure and get the data property immediately 
    // after getting the response from the api call
    const { data } = await axios.get(url, {
        headers: {
            'X-RapidAPI-Key': 'f80c00bcccmshf51878c7f9960a3p142d1ejsnc993cf7340cc',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });

    return data;
}