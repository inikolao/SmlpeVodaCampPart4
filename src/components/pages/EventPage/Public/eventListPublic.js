import React, {useEffect, useState} from 'react';


function EventListPublic() {
    const [index, setIndex] = useState(0);
    let k=0;
    const [slides,setSlides]= useState([
        {

        "title": "Birthday Party",
        "text": "join us",
        "image": "img1.jpg"
    },
        {

            "title": "Bar",
            "text": "join us",
            "image": "img2.jpg"
        }
    ]);

    useEffect(()=> {
        console.log('event profiles');
        setIndex(k++);
        console.log("koita k "+k);
    }, k);



    return (
        <div>
            <div id="navigation" className="text-center">
                <button
                    data-testid="button-restart"
                    disabled={index === 0}
                    onClick={() => setIndex(0)}
                    className="small outlined"
                >
                    Restart
                </button>
                <button
                    data-testid="button-prev"
                    disabled={index === 0}
                    onClick={() => setIndex(index - 1)}
                    className="small"
                >
                    Prev
                </button>
                <button
                    data-testid="button-next"
                    onClick={() => setIndex(index + 1)}
                    disabled={index === slides.length - 1}
                    className="small"
                >
                    Next
                </button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[index]["title"]}</h1>
                <p data-testid="text">{slides[index]["text"]}</p>
                <img src={require('../../../rawFiles/'+slides[index]["image"])}  height="600"/>
            </div>
        </div>
    );
}

export default EventListPublic;