import React from "react";

function Meme() {
    // Since React.useState returns an array of 2 elements i.e.
    // an element and function so we make use of array destructor
    // to retrieve the 2 elements as variables to use
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imageUrl: "",
    });

    const [allImages, setAllImages] = React.useState([]);

    // This approach
    React.useEffect(() => {
        console.log("Effect ran");
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllImages(data.data.memes)); // console.log the data in other to see its structure
    }, []);

    // // Or using async await approach
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // React.useEffect(async () => {
    //     console.log("Effect ran");
    //     const res = await fetch("https://api.imgflip.com/get_memes");
    //     const data = await res.json();
    //     // console.log the data in other to see its structure
    //     setAllImages(data.data.memes); 
    // }, []);

    console.log(meme);
    
    function getNewImage() {
        // Check if the topText and bottomText fields have 
        // been filled before fetching the image
        if (meme.topText && meme.bottomText) {
            const randNum = Math.floor(Math.random() * allImages.length);
            // const { url } = imagesArray[randNum];
            const url = allImages[randNum].url;
    
            setMeme((prevState) => {
                return {
                    ...prevState,
                    imageUrl: url,
                };
            });
        }
        return;
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setMeme(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    return (
        <main>
            <div className="meme-div">
                <input
                    className="meme-div-input"
                    type="text"
                    placeholder="Enter top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    required
                ></input>
                <input
                    className="meme-div-input"
                    type="text"
                    placeholder="Enter bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    required
                ></input>
                <button onClick={getNewImage} className="meme-div-btn">
                    Get a new meme image
                </button>
            </div>
            {/* Since memeImage is initially empty i.e. false/0 in terms of boolean, hence
                for starts (i.e. before button clicked) 0 && 0 evaluates 0 hence the whole 
                img line does not show but only shows when button is clicked i.e. 1 && 1
            */}
            <div className="meme">
                {meme.imageUrl && <img src={meme.imageUrl} className="meme-image"></img>}
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
